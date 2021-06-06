const express = require('express');
// const cors = require('cors');
const app = express();
const port = 8084;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(
//   cors({
//     origin: 'http://localhost:8081', //'https://0a821d9c237c.ngrok.io ',
//   })
// );
// app.use((req, res, next) => {
//   res.set({
//     'Access-Control-Allow-Origin': 'http://localhost:8082',
//     'Access-Control-Allow-Headers': 'Content-Type',
//   });
//   next();
// });

app.get('/', (req, res) => {
  res.status(200).send('hello');
});

app.post('/simple', (req, res) => {
  res.status(201).json({ url: req.url, data: { ...req.body } });
});

const corsOptions = {
  'Access-Control-Allow-Origin': 'http://localhost:8082',
  'Access-Control-Allow-Headers': 'Content-Type',
};

app.options('/json', (req, res, next) => {
  res.set(corsOptions);
  next();
});

app.post('/json', (req, res) => {
  if (req.is('json')) {
    res
      .status(201)
      .set(corsOptions)
      .json({ url: req.url, data: { ...req.body } });
  } else {
    res.sendStatus(400);
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
