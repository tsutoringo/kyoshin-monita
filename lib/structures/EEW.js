const Report = require('./Report');
const Security = require('./Security');
const dateFromFormat = require('../util/dateFormFormat');

/**
 * Represents EEW(Earthquake Early Warning)
 * @prop {Report} [report] EEW report
 * @prop {Date} [earthquakeTime] Earthquake occurrence time
 * @prop {String} [regionName] name of Erathquake Regeion
 * @prop {String} [latitude] epicenter latitude
 * @prop {String} [longitude] epicenter longitude
 * @prop {String} [depth] 
 * @prop {String} [maxScale]
 * @prop {String} [magnitude]
 * @prop {String} [alertFlg]
 * @prop {Security} security 
 * @prop {Date} requestTime
 */
class EEW {
	constructor (obj) {
		if (obj.report_id || obj.report_num || obj.report_time) this.report = new Report(obj.report_id, obj.report_num, obj.report_time);
		else this.report = void 0;

		if (this.hasReport) {
			this.earthquakeTime = new Date(dateFromFormat(obj.origin_time));
			this.regionName = obj.region_name;
			this.latitude = obj.latitude;
			this.longitude = obj.longitude;
			this.depth = obj.depth;
			this.maxScale = obj.calcintensity;
			this.magunitude = obj.magunitude;
			this.is = {
				final: obj.is_final,
				cancel: obj.is_cancel,
				training: obj.is_training
			};
			this.alertFlg = obj.alertflg;
		}

		this.security = new Security(obj.security);
		this.requestTime = new Date(dateFromFormat(obj.request_time));
	}

	/**
	 * @memberof EEW
	 * @type {Boolean}
	 */
	get hasReport () {
		return !!this.report;
	}
}

module.exports = EEW;
