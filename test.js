const Client = require("./lib/Client");

const kyoshinMinita = new Client({
	updateFrequency: 1000
});



kyoshinMinita.on("update", (data) => {
});

kyoshinMinita.on("earthquake", data => {
	console.log("earthquake!");
});

kyoshinMinita.on("newReport", data => {
	console.log("new Report!", `${data.eew.maxScale.suffix}`);
});

kyoshinMinita.start();