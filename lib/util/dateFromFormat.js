const moment = require("moment");

/**
 * Return Date
 * @param {String} s 
 * @param {String} [format="YYYYMMDDHHmmss"] 
 * @return {Date}
 */
module.exports = (s, format="YYYYMMDDHHmmss") => {
	return moment(s, format).toDate();
}