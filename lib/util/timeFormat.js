const moment = require('moment');
const { TIMESTAMP_FORMAT, TIMESTAMP_FORMAT_SHORT } = require("../Constants");

module.exports = function (date, type=0) {
	switch (type) {
		case 0:
			return moment(date).format(TIMESTAMP_FORMAT);
		case 1:
			return `${moment(date).format(TIMESTAMP_FORMAT_SHORT)}/${moment(date).format(TIMESTAMP_FORMAT)}`;
	}
}