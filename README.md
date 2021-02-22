# 強震モニタ監視用

強震モニタを監視するときに使います

install:
```
npm install --save tsutoringo/kyoshin-monita
```

usage:
```JS
const Client = require("./lib/Client");

// インスタンス化
const kyoshinMinita = new Client({
	// 監視周期
	updateFrequency: 1000
});


// updateFrequencyで指定した時間周期で取得が終わり次第呼び出されます
kyoshinMinita.on("update", ({imageURLs, eew}) => {
});

// 新しい地震が発生すると呼ばれます
kyoshinMinita.on("earthquake", ({imageURLs, eew}) => {
	console.log("earthquake!");
});

// 新しいレポートが出されると呼び出されます
kyoshinMinita.on("newReport", ({imageURLs, eew}) => {
	console.log("new Report!");
});

// 監視を開始します
kyoshinMinita.start();
```
