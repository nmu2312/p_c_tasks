const express = require('express');
const app = express();
const port = 80;

//public
app.use(express.static('public'));

app.listen(port, () => {
  console.log(`App listening at localhost:${port}`);
});
