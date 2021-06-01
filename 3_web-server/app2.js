const express = require('express');
// const bodyParser = require('body-parser');

const app = express();

app.use(express.urlencoded({ extended: true }));

app.post('/hello', (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

app.listen('3000', () => {
  console.log('Application started');
});
