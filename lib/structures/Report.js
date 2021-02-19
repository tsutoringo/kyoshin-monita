/**
 * Represents　Report
 * @prop {Stringq} id id of report
 * @prop {String} num Number of report
 * @prop {Date} time time of report
 */
class Report {
	/**
	 * @param {String} id id of report
	 * @param {String} num Number of report
	 * @param {String} time time of report
	 */
	constructor (id, num, time) {
		this.id = id;
		this.num = num;
		this.time = new Date(time);
	}
}

module.exports = Report;
