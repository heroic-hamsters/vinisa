const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '../client')));

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

app.listen(3000, function() {
  console.log('App is now listening on port 3000');
});