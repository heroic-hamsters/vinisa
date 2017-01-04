const request = require('request');
const Words = require('./db/collections/words');
const Word = require('./db/models/word');

exports.wordHandler = function(req, res) {
  // console.log(req.body);
  let word = req.body.word;

  new Word({text: word}).fetch().then(function(found) {
    if (found) {
      console.log('found');
      res.send(found);
    } else {
      Words.create({
        text: word
      }).then(function(newWord) {
        res.send(newWord);
      })
    }
  })
}
