const Client = require("./lib/Client");

const kyoshinMinita = new Client({
	updateFrequency: 1000
});



kyoshinMinita.on("update", (data) => {
	console.log(data);
});

kyoshinMinita.start();