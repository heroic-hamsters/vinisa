const request = require('request');
const Words = require('./db/collections/words');
const Word = require('./db/models/word');
const Sentences = require('./db/collections/sentences');
const Sentence = require('./db/models/sentence');
const Users = require('./db/collections/users');
const User = require('./db/models/user');
const Promise = require('bluebird');
const Language = require('./db/models/language');
const TranslatedWord = require('./db/models/translatedWord');

exports.getWords = function(req, res) {
  var username = req.params.username;
  new User().where({username: username}).fetchAll({withRelated: 'words'})
  .then(function(results) {
    res.send(results.models);
  });
};

exports.addWord = function(req, res) {

  var username = req.session.user.username;
  var text = req.body.text;
  var word = new Word({text: text});
  var foundWord;

  word.fetch()
  .then(function(found) {
    if (!found) {
      return word.save();
    }
    return found;
  }).then(function(word) {
    foundWord = word;
    return new TranslatedWord().where({word_id: foundWord.id, language_id: req.session.learnLanguage.id}).fetch();
  })
  .then(function(translatedWord) {
    if (!translatedWord) {
      return foundWord.languages().attach({language_id: req.session.learnLanguage.id, translation: req.body.translation});
    }
    return;
  })
  .then(function() {
    return Promise.all([
      new TranslatedWord().where({language_id: req.session.learnLanguage.id, word_id: foundWord.id}).fetch(),
      new User().where({username: username}).fetch()
    ]);
  })
  .spread(function(translatedWord, user) {

    return user.words().attach(translatedWord);
    res.end();
  })
  .catch(function(err) {
    if (err.errno !== 1062) {
      throw err;
    }
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
  var creator = req.session.user.username;
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
  var learnLanguage;
  var natLanguage;
  var user;
  new User({username: req.body.username}).fetch().then((found) => {
    if (found) {
      res.status(403).send('Username already exists');
    } else {
      Promise.all([
        new Language({name: req.body.nativeLanguage}).fetch(),
        new Language({name: req.body.learnLanguage}).fetch()
      ])
      .spread(function(nativeLanguage, newLearnLanguage) {
        learnLanguage = newLearnLanguage;
        natLanguage = nativeLanguage;
        return new User({username: req.body.username, password: req.body.password, native_language: nativeLanguage.id, learn_language: learnLanguage.id}).save();
      })
      .then(function(newUser) {
        user = newUser;
        return newUser.targetLanguages().attach(learnLanguage);
      })
      .then(function() {
        return req.session.regenerate(function() {
          req.session.user = user;
          req.session.learnLanguage = learnLanguage;
          req.session.nativeLanguage = natLanguage;
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
        Promise.all([new Language({id: user.attributes.native_language}).fetch(),
          new Language({id: user.attributes.learn_language}).fetch()
        ])
        .spread((nativeLanguage, learnLanguage) => {
          req.session.regenerate(() => {
            req.session.user = user;
            req.session.nativeLanguage = nativeLanguage;
            req.session.learnLanguage = learnLanguage;
            res.json({authenticated: true});
          });

        });

      } else {
        res.status(403).send('Invalid username or password');
      }
    }
  });
};

exports.getLanguages = function(req, res) {
  new Language().fetchAll()
  .then(function(languages) {
    res.send(languages.models);
  });
};

exports.getCodes = function(req, res) {
  new User({username: req.session.user.username}).fetch()
  .then(function(user) {
    console.log(user.attributes.native_language);
    return Promise.all([
      new Language({id: user.attributes.native_language}).fetch(),
      new Language({id: user.attributes.learn_language}).fetch()
    ]);
  })
  .then(function(results) {
    res.send(results);
  });
};

