const request = require('request');
const Words = require('./db/collections/words');
const Word = require('./db/models/word');
const Sentences = require('./db/collections/sentences');
const Sentence = require('./db/models/sentence');
const Users = require('./db/collections/users');
const User = require('./db/models/user');




exports.listSentences = function(req, res) {
  let sentence = req.body.sentence;
  let url = req.body.url;
  let word_id = req.body.word_id;
  let creator_id = req.body.creator_id;

  new Sentence({word_id: word_id}).fetch().then(function(found) {
    if (found) {
      console.log('found');
      res.send(found);
    }
  })
}

exports.createSentences = function(req, res) {
  let sentence = req.body.sentence;
  let url = req.body.url;
  let word_id = req.body.word_id;
  let creator_id = req.body.creator_id;

  new Sentence({word_id: word_id}).fetch().then(function(found) {
     Sentences.create({
      text: sentence,
      url: url,
      word_id: word_id,
      creator_id: creator_id
    }).then(function(newSentence) {
      res.send(newSentence);
    })
  })
}

exports.createUser = (req, res) => {
  console.log('Creating user');
  new User({username: req.body.username}).fetch().then((found) => {
    if (found) {
      res.status(403).send('Username already exists');
    } else {
      Users.create({
        username: req.body.username,
        password: req.body.password
      }).then((newUser) => {
        req.session.regenerate(() => {
          req.session.user = newUser;
          res.end();

        });
      });
    }
  });
};

exports.verifyUser = (req, res) => {
  new User({username: req.body.username}).fetch().then((user) => {
    if (!user) {
      res.sendStatus(403);
    } else {
      if (user.attributes.password === req.body.password) {
        req.session.regenerate(() => {
          req.session.user = user;
          res.json({authenticated: true});
        });

      } else {
        res.status(403).send('Invalid username or password');
      }
    }
  });
};


