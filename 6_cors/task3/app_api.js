const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: 'https://0a821d9c237c.ngrok.io ',
  })
);

app.get('/', (req, res) => {
  res.status(200).send('hello');
});

app.post('/simple', (req, res) => {
  res.status(201).json({ url: req.url, data: { ...req.body } });
});

app.post('/json', (req, res) => {
  if (req.is('json')) {
    res.status(201).json({ url: req.url, data: { ...req.body } });
  } else {
    res.sendStatus(400);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
