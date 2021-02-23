
/**
 * @extends String
 */
class JMAInt extends String {
	static format = /^([0-7])([強弱])?$/
	static colors = [
		["ffffff"],//震度 0
		["f2f2ff"],//震度 1
		["b3eaed"],
		["0041ff"],
		["fae696"],
		["ffe600","ff9900"],// 震度5 弱, 強
		["ff2800","ff2800"],
		["b40068"]
	];

	constructor (jmaInt) {
		if (!JMAInt.format.test(jmaInt)) throw new TypeError("Unknown JMA Int format.");
		super(jmaInt);
	}

	/**
	 * @memberof JMAInt
	 * @type {Number}
	 */
	get onlyInt () {
		return parseInt(this.match(JMAInt.format)[1]);
	}

	/**
	 * @memberof JMAInt
	 * @type {String}
	 */
	get suffix () {
		return this.match(JMAInt.format)[2];
	}

	/**
	 * Color code without #
	 * @memberof JMAInt
	 * @type {String}
	 */
	get color () {
		const index = this.onlyInt;
		const subIndex = (!this.suffix || this.suffix === "弱" ) ? 0 : 1;
		return JMAInt.colors[index][subIndex];
	}
}

module.exports = JMAInt;
