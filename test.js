const Client = require("./lib/Client");

const kyoshinMinita = new Client({
	updateFrequency: 1000
});



kyoshinMinita.on("update", (data) => {
	console.log("Update!", `${data.eew.images.JMA}`);
});

kyoshinMinita.on("earthquake", data => {
	console.log("earthquake!");
});

kyoshinMinita.on("newReport", data => {
});

kyoshinMinita.start();