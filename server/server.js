const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');
const db = require('./db/dbconfig');
const Word = require('./db/models/word');
const router = require('./router');

const app = express();

app.use(express.static(path.join(__dirname, '../client')));

// router.route('/api/')
app.use('/api', router);
// app.get('/api/words', handler.what);

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

app.listen(3000, function() {
  console.log('App is now listening on port 3000');
});
