const express = require('express');
const app = express();
const port = 8080;

//public
app.use(
  express.static('public', {
    setHeaders: (res, path, stat) => {
      res.set('Cache-Control', 'private, max-age=300');
    },
  })
);

//画像のみを返すエンドポイント
app.get('/cache', (req, res) => {
  res.set('Cache-control', 'private, max-age=300');
  // res.set('Expires', new Date(Date.now() + 2592000000).toUTCString());
  res.sendFile(`${__dirname}/pyoko_computer.png`);
  // res.sendFile(`${__dirname}/pyoko_computer.png`, {
  //   maxAge: 300000,
  // });
});
app.get('/nocache', (req, res) => {
  res.set('Cache-Control', 'no-store');
  res.status(200).sendFile(`${__dirname}/pyoko_computer.png`);
});

app.listen(port, () => {
  console.log(`App listening at localhost:${port}`);
});
