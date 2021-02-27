const Endpoints = require("../Endpoints");
const urljoin = require('url-join');

class Images {
	constructor (date, options) {
		this.date = date;
		this.options = Object.assign({
			theme: "w",
			zoom: "",
			type: "s"
		}, options);
	}

	/**
	 * ベースマップ
	 * @type {String} 画像のURL
	 */
	get baseMap () {
		return urljoin(Endpoints.BASE_URL, Endpoints.BASEMAP(this.options.zoom, this.options.theme));
	}

	/**
	 * 地震発生時の地表の色
	 * @type {String} 画像のRL
	 */
	get ESTShindo () {
		return urljoin(Endpoints.BASE_URL, Endpoints.EST_SHINDO(this.date, this.options.zoom));
	}

	/**
	 * リアルタイム震度
	 * @type {String} 画像のURL
	 */
	get JMA () {
		return urljoin(Endpoints.BASE_URL, Endpoints.JMA(this.date, this.options.type, this.options.zoom));
	}

	/**
	 * P波S波の画像
	 * @type {String} 画像のURL
	 */
	get PSWave () {
		return urljoin(Endpoints.BASE_URL, Endpoints.PS_WAVE(this.date, this.options.zoom));
	}
}

module.exports = Images;