const Report = require('./Report');
const Security = require('./Security');
const JMAInt = require('./JMAInt');
const Images = require('./Images');
const dateFromFormat = require('../util/dateFromFormat');

/**
 * Represents EEW(Earthquake Early Warning)
 * @prop {Report} [report] EEW report
 * @prop {Date} [earthquakeTime] Earthquake occurrence time
 * @prop {String} [regionName] name of Erathquake Regeion
 * @prop {String} [latitude] epicenter latitude
 * @prop {String} [longitude] epicenter longitude
 * @prop {String} [depth] 
 * @prop {JMAInt} [maxScale]
 * @prop {String} [magunitude]
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
			this.maxScale = new JMAInt(obj.calcintensity);
			this.magunitude = obj.magunitude;
			this.is = {
				final: obj.is_final,
				cancel: obj.is_cancel,
				training: obj.is_training,
				firstReport: false
			};
			this.alertFlg = obj.alertflg;
		}

		
		this.security = new Security(obj.security);
		this.requestTime = new Date(dateFromFormat(obj.request_time));
		this.images = new Images(this.requestTime);
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
