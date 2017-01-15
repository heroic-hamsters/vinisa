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
const TranslatedSentence = require('./db/models/translatedSentence');

exports.getWords = function(req, res) {
  var responseObj = {};
  responseObj.translations = [];
  var username = req.session.user.username;
  new User().where({username: username}).fetch({withRelated: 'words'})
   .then(function(results) {
     return Promise.map(results.toJSON().words, function(word) {
       if (word.language_id === req.session.learnLanguage.id) {
         responseObj.translations.push(word);
         return new Word({id: word.word_id}).fetch();
       }
     });
   })
   .then(function(words) {
     responseObj.words = words;
     res.send(responseObj);
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

exports.listWordSentences = function(req, res) {
  var word = req.params.word;
  var sentenceObj = {};

  new Word({text: word}).fetch()
  .then(function(word) {
    return new Sentence().where({word_id: word.id, language_id: req.session.learnLanguage.id}).fetchAll();
  })
  .then(function(sentences) {
    sentenceObj.nativeSentences = sentences;
    console.log(sentences.toJSON());
    return Promise.map(sentences.toJSON(), function(sentence) {
      return new TranslatedSentence().where({sentence_id: sentence.id, language_id: req.session.nativeLanguage.id}).fetch();
    });
  })
  .then(function(translatedSentences) {
    sentenceObj.translatedSentences = translatedSentences;
    res.send(sentenceObj);
  });
};

exports.listCreatedSentences = function(req, res) {
  var user = req.session.user;
  new Sentence({creator_id: user.id}).fetchAll()
  .then(function(sentences) {
    res.send(sentences);
  });
};

exports.listSavedSentences = function(req, res) {
  new User({username: req.session.user.username}).fetch({withRelated: 'sentences'})
  .then(function(results) {
    console.log(results);
  });
};

exports.createSentence = function(req, res) {
  var creator = req.session.user.username;
  var word = req.body.word;
  var text = req.body.sentence;
  var url = req.body.url;
  var languageId;
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
    console.log(user);
    creatorId = user.id;
    return new Sentence({text: text, url: url, word_id: wordId, creator_id: creatorId, language_id: req.session.nativeLanguage.id}).save();
    // res.send('Created sentence');
  })
  .then(function(sentence) {
    console.log(sentence);

    sentence.languages().attach({language_id: req.session.learnLanguage.id, translation: req.body.translation})
    res.send('Saved sentence');
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

exports.setDefaultLanguage = function(req, res) {
  var currentUser;
  var newLanguage;
  new User({username: req.session.user.username}).fetch()
  .then(function(user) {
    currentUser = user;
    return new Language({name: req.body.language}).fetch();
  })
  .then(function(language) {
    newLanguage = language;
    return currentUser.targetLanguages().attach(newLanguage);
  })
  .then(function() {
    currentUser.save({learn_language: newLanguage.id}, {method: 'update'});
    req.session.learnLanguage = newLanguage;
    res.send(currentUser);
  })
  .catch(function(err) {
    if (err.errno !== 1062) {
      throw err;
    }
  });
};
