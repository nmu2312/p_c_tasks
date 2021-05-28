const express = require('express');
const app = express();
const port = 8080;

app.use(
  express.static('public1', {
    setHeaders: (res, path, stat) => {
      res.cookie('name', 'app1', {
        domain: '3181acf6921a.ngrok.io',
        httpOnly: true,
      });
    },
  })
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
