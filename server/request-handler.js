const request = require('request');
const Words = require('./db/collections/words');
const Word = require('./db/models/word');
const Sentences = require('./db/collections/sentences');
const Sentence = require('./db/models/sentence');

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

exports.sentenceHandler = function(req, res) {
  let sentence = req.body.sentence;
  let url = req.body.url;
  let word_id = req.body.word_id;
  let creator_id = req.body.creator_id;

  new Sentence({text: sentence}).fetch().then(function(found) {
    if (found) {
      console.log('found');
      res.send(found);
    } else {
      Sentences.create({
        text: sentence,
        url: url,
        word_id: word_id,
        creator_id: creator_id
      }).then(function(newSentence) {
        res.send(newSentence);
      })
    }
  })

}
