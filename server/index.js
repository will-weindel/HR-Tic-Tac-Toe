const express = require ('express');
const path = require('path');

const app = express();
const port = 5555;

app.use(express.static(path.join(__dirname, '../client')));

app.get('/', (req, res) => {
  res.end();
})

app.listen(port, (err) => {
  if (err) {
    console.log('ERROR: ', err)
  } else {
    console.log('Listening on port: ', port);
  }
})