const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.status(200).json({
    text: 'hello world',
  });
});

app.post('/', (req, res) => {
  if (req.is('json')) {
    res.status(201).json(req.body);
  } else {
    res.sendStatus(400);
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
