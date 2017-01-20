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
const languageData = require('./db/languageStorage');
const cookie = require('react-cookie');
const bcrypt = require('bcrypt-nodejs');
require('dotenv').config();

//Handler to get a user's words.
exports.getWords = function(req, res) {
  const responseObj = {};
  const username = req.session.user.username;
  responseObj.translations = [];

  new User().where({username: username}).fetch({withRelated: 'words'})
  .then(function(results) {

    return Promise.filter(results.toJSON().words, function(word) {
      if (word.language_id === req.session.learnLanguage.id) {
        responseObj.translations.push(word);

        return word;
      }
    });
  })
  .then(function(words) {

    return Promise.map(words, function(word) {
      return new Word().where({id: word.word_id}).fetch();
    });

  })
  .then(function(words) {
    responseObj.words = words;

    res.send(responseObj);
  })
  .catch(function(err) {
    res.status(500).send('Error getting words ', err);
  });


};
//Handler to add a word to the database and responds with the translation in the users learn language.
exports.addWord = function(req, res) {
  const username = req.session.user.username;
  const text = req.body.text;
  const word = new Word({text: text});

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
    if (!translatedWord) {

      return axios.get(`https://www.googleapis.com/language/translate/v2?key=${process.env.CLOUD_API}&q=${encodeURIComponent(text)}&target=${req.session.learnLanguage.translateCode}`);

    } else {
      translation = translatedWord.attributes.translation;

      return;
    }
  })
  .then(function(response) {
    if (response) {
      translation = response.data.data.translations[0].translatedText;

      return foundWord.languages().attach({language_id: req.session.learnLanguage.id, translation: translation});
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
    translatedWordModel = translatedWord;
    userModel = user;

    return db.knex('user_words').where({user_id: user.id, translated_word_id: translatedWord.id});
  })
  .then(function(queryResults) {
    if (queryResults.length === 0) {
      userModel.words().attach(translatedWordModel);
    }

    res.send(translation);
  })
  .catch(function(err) {
    res.status(500).send('Error adding word ', err);
  });
};

//Helper function for list Word Sentences. Translates a sentence to the users learn language.
const getTranslatedSentence = function(sentenceId, languageId, text, translateCode) {
  return new Promise(function(resolve, reject) {

    new TranslatedSentence().where({sentence_id: sentenceId, language_id: languageId}).fetch()
    .then(function(translatedSentence) {
      if (translatedSentence) {

        resolve(translatedSentence);
      } else {

        axios.get(`https://www.googleapis.com/language/translate/v2?key=${process.env.CLOUD_API}&q=${encodeURIComponent(text)}&target=${translateCode}`).
        then(function(response) {

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

//Lists all the sentences for a particular word.
exports.listWordSentences = function(req, res) {
  const word = decodeURIComponent(req.params.word);
  const sentenceObj = {};

  new Word().where({text: word}).fetch()
  .then(function(word) {
    return new Sentence().where({word_id: word.id, language_id: req.session.learnLanguage.id}).fetchAll();
  })
  .then(function(learnSentences) {
    sentenceObj.learnSentences = learnSentences;

    return Promise.map(learnSentences.toJSON(), function(sentence) {
      return getTranslatedSentence(sentence.id, req.session.nativeLanguage.id, sentence.text, req.session.nativeLanguage.translateCode);

    });
  })
  .then(function(nativeSentences) {
    sentenceObj.nativeSentences = nativeSentences;

    res.send(sentenceObj);
  })
  .catch(function(err) {
    res.status(500).send('Error getting word sentences ', err);
  });
};

//Lists all sentences created by a particular user.
exports.listCreatedSentences = function(req, res) {
  const user = req.session.user;

  new Sentence().where({creator_id: user.id}).fetchAll()
  .then(function(sentences) {

    res.send(sentences);
  })
  .catch(function(err) {
    res.status(500).send('Error getting created sentences ', err);
  });
};

//Lists all sentences saved by a user.
exports.listSavedSentences = function(req, res) {
  const sentenceObj = {};

  new User().where({username: req.session.user.username}).fetch({withRelated: 'sentences'})
  .then(function(results) {
    sentenceObj.translatedSentences = results.toJSON().sentences;

    return Promise.map(results.toJSON().sentences, function(sentence) {
      return new TranslatedSentence().where({sentence_id : sentence.id, language_id: req.session.nativeLanguage.id}).fetch();
    });
  })
  .then(function(nativeSentences) {
    sentenceObj.nativeSentences = nativeSentences;
    res.send(sentenceObj);
  })
  .catch(function(err) {
    res.status(500).send('Error getting saved sentences ', err);
  });
};

//Creates a new sentence and stores it into the database.
exports.createSentence = function(req, res) {
  const creator = req.session.user.username;
  const word = req.body.word;
  const text = req.body.sentence;
  const url = req.body.url;

  var languageId;
  var wordId;
  var creatorId;

  new Word().where({text: word}).fetch()
  .then(function(word) {
    wordId = word.id;

    return new User().where({username: creator}).fetch();
  }).then(function(user) {
    creatorId = user.id;

    return new Sentence({text: text, url: url, word_id: wordId, creator_id: creatorId, language_id: req.session.nativeLanguage.id}).save();
  })
  .then(function(sentence) {
    sentence.languages().attach({language_id: req.session.learnLanguage.id, translation: req.body.translation});

    res.send('Created sentence');
  })
  .catch(function(err) {
    res.status(500).send('Error creating sentence ', err);
  });
};

//Saves a sentence to a user.
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
  })
  .catch(function(err) {
    res.status(500).send('Error saving sentence ', err);
  });
};

//Creates a new user.
exports.createUser = (req, res) => {
  var learnLanguage;
  var natLanguage;
  var user;

  new User().where({username: req.body.username}).fetch().then((found) => {
    if (found) {
      throw ('Username already exists');
    } else {

      // Store hash in your password DB.
      var hash = bcrypt.hashSync(req.body.password);

      Promise.all([
        new Language().where({name: req.body.nativeLanguage}).fetch(),
        new Language().where({name: req.body.learnLanguage}).fetch()
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
      res.status(403).send('Username already exists ', err);
    } else {
      res.status(500).send('Error creating user ', err);
    }
  });
};

//Verifies a user's username and password.
exports.verifyUser = (req, res) => {
  var username = req.body.username;
  var password = req.body.password;

  new User().where({username: username}).fetch().then(function(user) {
    if (!user) {
      throw ('Invalid username or password');
    } else {
      var stored_hash = user.attributes.password;
      var verified = bcrypt.compareSync(password, stored_hash);

      if (verified) {
        Promise.all([new Language().where({id: user.attributes.native_language}).fetch(),
          new Language().where({id: user.attributes.learn_language}).fetch()
        ])
        .spread(function(nativeLanguage, learnLanguage) {

          req.session.regenerate(function() {
            req.session.user = user;
            req.session.nativeLanguage = nativeLanguage;
            req.session.learnLanguage = learnLanguage;
            res.redirect('/');
          });
        });
      } else {
        throw ('Invalid username or password');
      }
    }
  })
  .catch(function(err) {
    if (err === 'Invalid username or password') {
      res.status(403).send('Invalid username or password');
    } else {
      res.status(500).send('Error verifying user', err);
    }
  });
};

//Gets all supported languages.
exports.getLanguages = function(req, res) {
  //Runs a script that populates the languages table with support languages.
  if (!cookie.load('languagesSaved')) {
    eval(languageData.runScript());
    cookie.save('languagesSaved', true);
  }


  new Language().fetchAll()
  .then(function(languages) {
    res.send(languages.models);
  })
  .catch(function(error) {
    res.status(500).send('Error getting languages ', error);
  });
};

//Get's both speech and translate codes for a user.
exports.getCodes = function(req, res) {
  new User().where({username: req.session.user.username}).fetch()
  .then(function(user) {

    return Promise.all([
      new Language().where({id: user.attributes.native_language}).fetch(),
      new Language().where({id: user.attributes.learn_language}).fetch()
    ]);
  })
  .then(function(results) {
    res.send(results);
  })
  .catch(function(error) {
    res.status(500).send('Error getting language codes ', error);
  });
};

//Changes a user's default language and adds it to the user's languages.
exports.setDefaultLanguage = function(req, res) {
  var currentUser;
  var newLanguage;

  new User().where({username: req.session.user.username}).fetch()
  .then(function(user) {
    currentUser = user;

    return new Language().where({name: req.body.language}).fetch();
  })
  .then(function(language) {
    newLanguage = language;
    currentUser.save({learn_language: newLanguage.id}, {method: 'update'});
    req.session.learnLanguage = newLanguage;

    return db.knex('user_languages').where({user_id: currentUser.id, language_id: newLanguage.id});
  })
  .then(function(queryResults) {
    if (queryResults.length === 0) {
      return currentUser.targetLanguages().attach(newLanguage);

    }
    return;
  })
  .then(function() {
    res.send('Changed language');

  })
  .catch(function(err) {
    res.status(500).send('Error changing language ', err);

  });
};

//Gets the labels for a picture using the Google Vision API.
exports.getLabels = function(req, res) {
  axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.CLOUD_API}`, req.body.request)
  .then(function(response) {

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
    res.status(500).send('Error getting labels for picture ', err);
  });
};

//Converts audio to speech using Google Speech API.
exports.audioToSpeech = function(req, res) {
  const speechObj = {};

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

    res.status(500).send('Error converting audio to speech ', err);
  });
};

//Remove a saved sentence from a user.
exports.unsaveSentence = function(req, res) {
  const url = req.query.url;
  var sentence;

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
    res.status(500).send('Error unsaving sentence ', err);
  });
};

//Removes a saved word from a user.
exports.unsaveWord = function(req, res) {
  var word;

  new Word().where({text: req.params.text}).fetch()
  .then(function(word) {

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
    res.status(500).send('Error unsaving word ', err);
  });
};
