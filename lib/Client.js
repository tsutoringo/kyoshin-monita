const formatTime = require("./util/timeFormat");
const Constants = require("./Constants");
const Endpoints = require("./Endpoints");

const EEW = require("./structures/EEW");
const Latest = require("./structures/Latest")

const { EventEmitter } = require("events");
const axios = require("axios");
const moment = require("moment-timezone");

/**
 * @prop {EEW} lastEEW
 */
class Client extends EventEmitter{
	static getTimestamp (date) {
		return formatTime(date);
	}

	static getShortTimestamp (date) {
		return formatTime(date, 1);
	}

	constructor (options) {
		super();
		this.options = options;
		this.diff = 0;
		this.lastEEW = void 0;
		this.request = axios.create({
			baseURL: Endpoints.BASE_URL,
			headers: {
				'Content-Type': 'application/json',
				'X-Requested-With': 'XMLHttpRequest',
				'User-Agent': Constants.USER_AGENT
			},
			responseType: 'json'
		});
		this.interval = null;
	}

	/**
	 * start watch kyoshin-monita
	 */
	async start (fakeDate) {
		if (!fakeDate) {
			this.getLatest().then(latest => {
				this.diff = moment().diff(moment(latest.latestTime), 'milliseconds');
				this.update();
				this.emit('ready', latest);
			});
		} else {
			this.diff = moment().diff(moment(fakeDate), 'milliseconds');
			this.update();
			this.emit('ready');
		}
		this.interval = setInterval(() => this.update(), this.options.updateFrequency)
	}

	async update () {
		const checkTime = moment().subtract(this.diff, "milliseconds");
		this.getEEW(checkTime).then(eew => {
			if (!this.lastEEW) this.lastEEW = eew;
			const datasets = {
				eew,
				imageURLs: {
					PSWave: new URL(Endpoints.PS_WAVE(checkTime), Endpoints.BASE_URL),
					ESTShindo: new URL(Endpoints.EST_SHINDO(checkTime), Endpoints.BASE_URL),
					realTime: new URL(Endpoints.REAL_TIME(checkTime), Endpoints.BASE_URL)
				}
			}
			if ((eew.hasReport && !this.lastEEW.hasReport)) eew.is.firstReport = true;
			this.emit("update", datasets);
			if ((eew.hasReport && !this.lastEEW.hasReport)) {
				this.emit("earthquake", datasets);
			}
			if (
				(eew.hasReport && !this.lastEEW.hasReport) ||
				((eew.hasReport && this.lastEEW.hasReport) && (eew.report.num != this.lastEEW.report.num))
			) {
				this.emit("newReport", datasets);
			}
			this.lastEEW = eew;
		});
	}

	/**
	 * Return the most recent time generated.
	 * @return {Promise<Latest>} 
	 */
	getLatest () {
		return new Promise((resolve, reject) => {
			this.request.get(Endpoints.LATEST()).then(({data}) => {
				resolve(new Latest(data));
			})
		})
	}

	/**
	 * return Earthquake Early Warning data
	 * @return {Promise<EEW>}
	 */
	getEEW (checkTime) {
		return new Promise((resolve, reject) => {
			this.request.get(Endpoints.EEW(checkTime)).then(({data}) => {
				resolve(new EEW(data));
			});
		});
	}
}

module.exports = Client;
