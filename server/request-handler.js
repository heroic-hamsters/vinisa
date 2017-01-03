const request = require('request');
const bodyParser = require('body-parser');
const Words = require('./db/collections/words');
const Word = require('./db/models/word');

exports.what = function(req, res) {
  // console.log(req);
  new Word({text: 'pizza'}).fetch().then(function(found) {
    if (found) {
      console.log('found');
      // res.send('found')
    } else {
      Words.create({
        text: "pizza"
      }).then(function(newWord) {
        res.send(newWord);
      })
    }
  })
}
