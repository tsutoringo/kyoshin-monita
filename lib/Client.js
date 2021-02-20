const formatTime = require("./util/timeFormat");
const Constants = require("./Constants");
const Endpoints = require("./Endpoints");

const EEW = require("./structures/EEW");

const { EventEmitter } = require("events");
const axios = require("axios");
const moment = require("moment-timezone");

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
		this.lastTime = null;
		this.request = axios.create({
			baseURL: Endpoints.BASE_URL,
			headers: {
				'Content-Type': 'application/json',
				'X-Requested-With': 'XMLHttpRequest',
				'User-Agent': Constants.USER_AGENT
			},
			responseType: 'json'
		});
	}

	async start () {
		this.request.get(Endpoints.LATEST).then(({data}) => {
			this.lastTime = moment(data.latest_time, 'YYYY/MM/DD HH:mm:ss');
			this.update();
		});
	}

	async update () {
		const checkTime = this.lastTime;
		this.lastTime = moment(this.lastTime).add(this.options.updateFrequency, "milliseconds");
		console.log(Endpoints.EEW(checkTime));
		this.request.get(Endpoints.EEW(checkTime)).then(({data}) => {
			const datasets = {
				eew: new EEW(data),
				imageURLs: {
					PSWave: new URL(Endpoints.PS_WAVE(checkTime), Endpoints.BASE_URL),
					ESTShindo: new URL(Endpoints.EST_SHINDO(checkTime), Endpoints.BASE_URL),
					realTime: new URL(Endpoints.REAL_TIME(checkTime), Endpoints.BASE_URL)
				}
			}
			this.emit("update", datasets);
		});
		setTimeout(() => this.update(), this.options.updateFrequency)
	}
}

module.exports = Client;
