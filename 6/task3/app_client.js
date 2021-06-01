const express = require('express');
const app = express();
const port = 8081;

app.use(express.static('public'));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
