import axios from 'axios';

var getWords = function(cb) {
  axios.get('/api/words')
  .then(function(data) {
    cb(data.data);
  })
  .catch(function(error) {
    console.log('Error getting words from the database', error);
  });
};

var addWord = function(text, cb) {
  axios.post('/api/words', {text: text})
  .then(function(data) {
    cb(data.data);
  })
  .catch(function(error) {
    console.log('Error adding word to user', error);
  });
};

var unsaveWord = function(word, cb) {
  axios.delete('/api/words/' + word)
  .then(function(data) {
    cb(data.data);
  })
  .catch(function(error) {
    console.log('Error deleting word', error);
  });
};

var getCodes = function(cb) {
  axios.get('/api/codes')
  .then(function(data) {
    cb(data.data);
  })
  .catch(function(error) {
    console.log('Error getting language codes', error);
  });

};

var getSentences = function(word, cb) {
  axios.get('/api/sentences/' + word)
  .then(function(data) {
    cb(data.data);
  })
  .catch(function(error) {
    console.log('Error getting sentences from database', error);
  });
};

var getSavedSentences = function(cb) {
  axios.get('/api/savedsentences')
  .then(function(data) {
    cb(data.data);
  })
  .catch(function(errror) {
    console.log('Error getting saved sentences', error);
  });
};

var getContributedSentences = function(cb) {
  axios.get('/api/contributedsentences')
  .then(function(data) {
    cb(data.data);
  })
  .catch(function(error) {
    console.log('Error getting contributed sentences', error);
  });
};

var addSentences = function(word, sentence, translation, url) {
  axios.post('/api/sentences', {word: word, sentence: sentence, translation: translation, url: url})
  .then(function(data) {
    console.log('Successfully added sentence');
  })
  .catch(function(error) {
    console.log('Error adding sentence', error);
  });
};

var removeSavedSentence = function(url, cb) {
  axios.delete('/api/sentences/?' + url)
  .then(function(data) {
    cb(data.data);
  })
  .catch(function(error) {
    console.log('Error deleting sentence', error);
  });

};

var loginAjax = function(username, password, cb) {
  axios.post('/api/login', {username: username, password: password})
  .then(function(data) {
    cb({authenticated: true});
  })
  .catch(function(error) {
    cb({authenticated: false});
    console.log('Error logging in', error);
  });

};

var signupAjax = function(username, password, nativeLanguage, learnLanguage, cb) {
  axios.post('/api/signup', {username: username, password: password, nativeLanguage: nativeLanguage, learnLanguage: learnLanguage})
  .then(function(data) {
    cb({authenticated: true});
  })
  .catch(function(error) {
    cb({authenticated: false});
    console.log('Error signing up', error);
  });
};

var getLanguages = function(cb) {
  axios.get('/api/languages')
  .then(function(data) {
    cb(data.data);
  })
  .catch(function(error) {
    console.log('Error getting languages from database', error);
  });

};

var addLanguage = function(language) {
  axios.post('/api/languages', {language: language})
  .then(function(data) {
    console.log('Added new language to user');
  })
  .catch(function(error) {
    console.log('Error adding language to user', error);
  });

};

var saveSentence = function(url) {
  axios.post('/api/users/sentences', {url: url})
  .then(function(data) {
    console.log('Added sentence to user');
  })
  .catch(function(err) {
    console.log('Error adding sentence to user');
  });
};

var getLabels = function(request, cb) {

  axios.post('/api/vision', {request: request})
  .then(function(data) {
    console.log(data);
    cb(data.data);
  })
  .catch(function(error) {
    console.log('Error in getting labels', err);
  });

};

var recognizeAudio = function(request, cb) {
  axios.post('/api/speech', {request: request})
  .then(function(data) {
    cb(data.data);
  })
  .catch(function(error) {
    cb('Error in recognizing audio');
    console.log(error);
  });
};

module.exports = {
  getWords: getWords,
  addWord: addWord,
  unsaveWord: unsaveWord,
  getSentences: getSentences,
  getSavedSentences: getSavedSentences,
  getContributedSentences: getContributedSentences,
  addSentences: addSentences,
  loginAjax: loginAjax,
  signupAjax: signupAjax,
  getLanguages: getLanguages,
  saveSentence: saveSentence,
  removeSavedSentence: removeSavedSentence,
  getCodes: getCodes,
  addLanguage: addLanguage,
  getLabels: getLabels,
  recognizeAudio: recognizeAudio,
};