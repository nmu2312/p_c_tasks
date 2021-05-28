const express = require('express');
var app = express();
app.use(express.json());
// GETアクセス
app.get('/', (req, res) => {
  res.json({ text: 'hello world' });
  // curl --header "Content-Type: application/json" http://localhost:8080 --dump-header -
});
// POSTアクセス
app.post('/', (req, res) => {
  // application/jsonかどうか？
  if (!req.is('application/json')) {
    res.send(400).send(req.body);
  } else {
    res.status(201).send(req.body);
  }
  // 成功例リクエスト
  //  curl --data '{"name": "hoge"}' --header "Content-Type: application/json" http://localhost:8080 --dump-header -
  // 失敗例リクエスト
  //  curl --data '{"name": "hoge"}'  http://localhost:8080 --dump-header -
});

app.listen(3300, () => {
  console.log(`Example app listening at http://localhost:3300`);
});
