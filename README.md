# 強震モニタ監視用

強震モニタを監視するときに使います

isntall:
```
npm install --save tsutoringo/kyoshin-monita
```

usage:
```JS
const Client = require("./lib/Client");

const kyoshinMinita = new Client({
	updateFrequency: 1000
});



kyoshinMinita.on("update", ({imageURLs, eew}) => {
});

kyoshinMinita.on("earthquake", ({imageURLs, eew}) => {
	console.log("earthquake!");
});

kyoshinMinita.on("newReport", ({imageURLs, eew}) => {
	console.log("new Report!");
});

kyoshinMinita.start();
```
