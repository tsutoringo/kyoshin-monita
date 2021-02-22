const Security = require("./Security");

/**
 * Represents latest.json
 * @prop {Date} latestTime
 * @prop {Date} requestTime
 * @prop {Security} security
 */
class Latest {
	constructor (obj) {
		this.latestTime = new Date(obj.latest_time);
		this.requestTime = new Date(obj.request_time);
		this.security = new Security(obj.security);
	}
}

module.exports = Latest;