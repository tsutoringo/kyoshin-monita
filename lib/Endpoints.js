const f = require("./util/timeFormat");

module.exports.BASE_URL = "http://www.kmoni.bosai.go.jp/";

module.exports.LATEST =                                  "/webservice/server/pros/latest.json";
module.exports.EEW =                           (date) => `/webservice/hypo/eew/${f(date)}.json`;
module.exports.MESSAGE =                                 "/webservice/maintenance/message.json";

// Image Endpoints
module.exports.PS_WAVE =              (date, zoom="") => `/data/map_img/PSWaveImg${zoom?"_"+zoom:""}/eew/${f(date, 1)}.eew.gif`;
module.exports.EST_SHINDO =           (date, zoom="") => `/data/map_img/EstShindoImg${zoom?"_"+zoom:""}/eew/${f(date, 1)}.eew.gif`;
module.exports.REAL_TIME =  (date, type="s", zoom="") => `/data/map_img/RealTimeImg${zoom?"_"+zoom:""}/jma_${type}/${f(date, 1)}.jma_${type}.gif`;
