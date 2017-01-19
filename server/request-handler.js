const request = require('request');
const db = require('./db/dbconfig');
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
const axios = require('axios');
require('dotenv').config();
var languageData = require('./db/languageStorage');
var cookie = require('react-cookie');
var bcrypt = require('bcrypt-nodejs');

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
  console.log(text);
  var word = new Word({text: text});
  var foundWord;
  var translation;
  var translatedWordModel;
  var userModel;

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
    console.log(translatedWord);
    if (!translatedWord) {

      return axios.get(`https://www.googleapis.com/language/translate/v2?key=${process.env.CLOUD_API}&q=${encodeURIComponent(text)}&target=${req.session.learnLanguage.translateCode}`);
      // return foundWord.languages().attach({language_id: req.session.learnLanguage.id, translation: req.body.translation});
    } else {
      translation = translatedWord.attributes.translation;
      // console.log(translation);
      return;
    }
  })
  .then(function(response) {
    // console.log(response);
    if (response) {
      translation = response.data.data.translations[0].translatedText;
      return foundWord.languages().attach({language_id: req.session.learnLanguage.id, translation: translation});
    }
    // console.log(translation);
    return;
  })
  .then(function() {
    return Promise.all([
      new TranslatedWord().where({language_id: req.session.learnLanguage.id, word_id: foundWord.id}).fetch(),
      new User().where({username: username}).fetch()
    ]);
  })
  .spread(function(translatedWord, user) {
    // console.log(translation);
    translatedWordModel = translatedWord;
    userModel = user;
    return db.knex('user_words').where({user_id: user.id, translated_word_id: translatedWord.id});
    // res.send(translation);
  })
  .then(function(queryResults) {
    if (queryResults.length === 0) {
      userModel.words().attach(translatedWordModel);
    }
    res.send(translation);
  })
  .catch(function(err) {
    if (err.errno !== 1062) {
      throw err;
    }
  });
};

var getTranslatedSentence = function(sentenceId, languageId, text, translateCode) {
  return new Promise(function(resolve, reject) {
    new TranslatedSentence().where({sentence_id: sentenceId, language_id: languageId}).fetch()
    .then(function(translatedSentence) {
      if (translatedSentence) {
        resolve(translatedSentence);
      } else {
        axios.get(`https://www.googleapis.com/language/translate/v2?key=${process.env.CLOUD_API}&q=${encodeURIComponent(text)}&target=${translateCode}`).
        then(function(response) {
          console.log(response.data.data.translations[0].translatedText);
          return new TranslatedSentence({sentence_id: sentenceId, language_id: languageId, translation: response.data.data.translations[0].translatedText}).save();
        })
        .then(function(translatedSentence) {
          resolve(translatedSentence);
        });
      }
    });
  })
  .catch(function(err) {
    throw err;
  });
};

exports.listWordSentences = function(req, res) {
  // console.log(req.params);
  // console.log((req.params.word).fromCharCode(parseInt(unicode, 16)));
  // console.log(decodeURIComponent(req.params.word));
  var word = decodeURIComponent(req.params.word);
  var sentenceObj = {};
  new Word({text: word}).fetch()
  .then(function(word) {
    return new Sentence().where({word_id: word.id, language_id: req.session.learnLanguage.id}).fetchAll();
  })
  .then(function(learnSentences) {
    sentenceObj.learnSentences = learnSentences;
    return Promise.map(learnSentences.toJSON(), function(sentence) {
      // new TranslatedSentence().where({sentence_id: sentence.id, language_id: req.session.nativeLanguage.id}).fetch()
      return getTranslatedSentence(sentence.id, req.session.nativeLanguage.id, sentence.text, req.session.nativeLanguage.translateCode);

    });
  })
  .then(function(nativeSentences) {
    sentenceObj.nativeSentences = nativeSentences;
    res.send(sentenceObj);
  })
  .catch(function(err) {
    throw err;
  });
};

exports.listCreatedSentences = function(req, res) {
  var user = req.session.user;
  new Sentence().where({creator_id: user.id}).fetchAll()
  .then(function(sentences) {
    res.send(sentences);
  });
};

exports.listSavedSentences = function(req, res) {
  var sentenceObj = {};
  new User().where({username: req.session.user.username}).fetch({withRelated: 'sentences'})
  .then(function(results) {
    console.log(results.toJSON().sentences);
    sentenceObj.translatedSentences = results.toJSON().sentences;
    return Promise.map(results.toJSON().sentences, function(sentence) {
      return new TranslatedSentence().where({sentence_id : sentence.id, language_id: req.session.nativeLanguage.id}).fetch();
    });
  })
  .then(function(nativeSentences) {
    sentenceObj.nativeSentences = nativeSentences;
    console.log(sentenceObj);
    res.send(sentenceObj);
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
    res.send('Created sentence');
  });
};

exports.saveSentence = function(req, res) {
  var saveSentence;
  new Sentence().where({url: req.body.url}).fetch()
  .then(function(sentence) {
    saveSentence = sentence;
    return db.knex('user_sentences').where({user_id: req.session.user.id, sentence_id: sentence.id});

  })
  .then(function(queryResults) {
    if (queryResults.length === 0) {
      saveSentence.users().attach({user_id: req.session.user.id});
      res.send('Saved sentence');

    }
  });
};

exports.createUser = (req, res) => {
  var learnLanguage;
  var natLanguage;
  var user;
  new User({username: req.body.username}).fetch().then((found) => {
    if (found) {
      throw ('Username already exists');
    } else {
      var hash = bcrypt.hashSync(req.body.password);
        // Store hash in your password DB.
      Promise.all([
        new Language({name: req.body.nativeLanguage}).fetch(),
        new Language({name: req.body.learnLanguage}).fetch()
      ])
      .spread(function(nativeLanguage, newLearnLanguage) {
        learnLanguage = newLearnLanguage;
        natLanguage = nativeLanguage;
        return new User({username: req.body.username, password: hash, native_language: nativeLanguage.id, learn_language: learnLanguage.id}).save();
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
  }).catch(function(err) {
    if (err === 'Username already exists') {
      res.status(403).send('Username already exists');
    }
  });
};

exports.verifyUser = (req, res) => {
  console.log(req.session);

  var username = req.body.username;
  var password = req.body.password;
  new User({username: username}).fetch().then((user) => {
    if (!user) {
      throw ('Invalid username or password');
      res.sendStatus(403);
    } else {
      var stored_hash = user.attributes.password;
      var verified = bcrypt.compareSync(password, stored_hash);
      if (verified) {
        Promise.all([new Language({id: user.attributes.native_language}).fetch(),
          new Language({id: user.attributes.learn_language}).fetch()
        ])
        .spread((nativeLanguage, learnLanguage) => {
          req.session.regenerate(() => {
            req.session.user = user;
            req.session.nativeLanguage = nativeLanguage;
            req.session.learnLanguage = learnLanguage;
            res.redirect('/');
          });
        });
      } else {
        res.status(403).send('Invalid username or password');
      }
    }
  });
};

exports.getLanguages = function(req, res) {
  // console.log(req.session.user);
  if (!cookie.load('languagesSaved')) {
    eval(languageData.runScript());
    cookie.save('languagesSaved', true);
  }


  new Language().fetchAll()
  .then(function(languages) {
    res.send(languages.models);
  });
};

exports.getCodes = function(req, res) {
  new User({username: req.session.user.username}).fetch()
  .then(function(user) {
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
    currentUser.save({learn_language: newLanguage.id}, {method: 'update'});
    req.session.learnLanguage = newLanguage;
    return currentUser.targetLanguages().attach(newLanguage);
  })
  .then(function() {
    res.send(currentUser);
  })
  .catch(function(err) {
    if (err.errno !== 1062) {
      throw err;
    }
  });
};

exports.getLabels = function(req, res) {
  axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.CLOUD_API}`, req.body.request)
  .then(function(response) {
    // console.log(response.data.responses);
    return Promise.map(response.data.responses[0].labelAnnotations, function(label) {
      return axios.get(`https://www.googleapis.com/language/translate/v2?key=${process.env.CLOUD_API}&q=${label.description}&target=${req.session.nativeLanguage.translateCode}`);
    });
  })
  .then(function(results) {
    var translatedLabels = [];
    for (var i = 0; i < results.length; i++) {
      translatedLabels.push(results[i].data.data.translations[0].translatedText);
    }

    res.send(translatedLabels);
  })
  .catch(function(err) {
    console.log(err);
  });
};

exports.audioToSpeech = function(req, res) {
  // console.log(Object.keys(req.body));
  var speechObj = {};
  axios.post(`https://speech.googleapis.com/v1beta1/speech:syncrecognize?key=${process.env.CLOUD_API}`, req.body.request)
  .then(function(response) {
    speechObj.text = response.data.results[0].alternatives[0].transcript;
    return axios.get(`https://www.googleapis.com/language/translate/v2?key=${process.env.CLOUD_API}&q=${encodeURIComponent(speechObj.text)}&target=${req.session.learnLanguage.translateCode}`);
  })
  .then(function(response) {
    speechObj.translatedText = response.data.data.translations[0].translatedText;
    res.send(speechObj);
  })
  .catch(function(err) {
    console.log(err);
  });
};

exports.unsaveSentence = function(req, res) {
  var sentence;
  var url = req.query.url;
  new Sentence().where({url: url}).fetch()
  .then(function(foundSentence) {
    sentence = foundSentence;
    return new User().where({id: req.session.user.id}).fetch();
  })
  .then(function(user) {
    user.sentences().detach({sentence_id: sentence.id});
    res.send(sentence);
  })
  .catch(function(err) {
    console.log('Error unsaving sentence ', err);
  });
};

exports.unsaveWord = function(req, res) {
  var word;

  new Word().where({text: req.params.text}).fetch()
  .then(function(word) {
    console.log(word);
    return new TranslatedWord().where({word_id: word.id, language_id: req.session.learnLanguage.id}).fetch();
  })
  .then(function(translatedWord) {
    word = translatedWord;
    return new User().where({id: req.session.user.id}).fetch();
  })
  .then(function(user) {
    user.words().detach({translated_word_id: word.id});
    res.send(word);
  })
  .catch(function(err) {
    console.log('Error unsaving word', err);
  });
};
