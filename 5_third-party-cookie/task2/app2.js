const express = require('express');
const app = express();
const port = 8081;

app.use(
  express.static('public2', {
    setHeaders: (res, path, stat) => {
      res.cookie('name', 'app2', {
        domain: 'localhost',
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
    },
  })
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
