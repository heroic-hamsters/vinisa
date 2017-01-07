const request = require('request');
const Words = require('./db/collections/words');
const Word = require('./db/models/word');
const Sentences = require('./db/collections/sentences');
const Sentence = require('./db/models/sentence');
const Users = require('./db/collections/users');
const User = require('./db/models/user');
const Promise = require('bluebird');

exports.getWords = function(req, res) {
  var username = req.params.username;
  new User().where({username: username}).fetchAll({withRelated: 'words'})
  .then(function(results) {
    res.send(results.models);
  });
};

exports.addWord = function(req, res) {
  var username = req.body.username;
  var text = req.body.text;
  var word = new Word({text: text});
  word.fetch()
  .then(function(found) {
    if (!found) {
      word.save();
    }
  }).then(function() {
    new User().where({username: username}).fetch()
    .then(function(user) {
      user.words().attach(word);
      res.send('Added word');
    });

  });
};

exports.listSentences = function(req, res) {
  var word = req.params.word;
  // var params = {};
  new Word({text: word}).fetchAll({withRelated: 'sentences'})
  .then(function(results) {

    // params.sentences = results.models;
    res.send(JSON.stringify(results.models));
  });
};

exports.createSentence = function(req, res) {
  var creator = req.session.username;
  var word = req.body.word;
  var text = req.body.sentence;
  var url = req.body.url;
  var wordId;
  var creatorId;

  console.log(creator);
  console.log(word);
  console.log(text);
  console.log(url);

  new Word({text: word}).fetch()
  .then(function(word) {
    console.log(word.id);
    wordId = word.id;
    return new User({username: creator}).fetch();
  }).then(function(user) {
    // console.log(user);
    creatorId = user.id;
    new Sentence({text: text, url: url, word_id: wordId, creator_id: creatorId}).save();
    res.send('Created sentence');
  });
};

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
  var username = req.body.username;
  var password = req.body.password;
  new User({username: username}).fetch().then((user) => {
    if (!user) {
      res.sendStatus(403);
    } else {
      if (user.attributes.password === password) {
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



