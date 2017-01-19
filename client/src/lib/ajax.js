import axios from 'axios';

var getWords = function(cb) {
  $.ajax({
    url: '/api/words',
    method: 'GET',
    contentType: 'application/json',
    success: (data) => cb(data),
    error: (err) => console.log('Error getting words from the database', err)
  });
};

var addWord = function(text, cb) {
  $.ajax({
    url: '/api/words',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({text: text}),
    success: (data) => cb(data),
    error: (err) => console.log('Error adding word to user', err)
  });
};

var unsaveWord = function(word, cb) {
  $.ajax({
    url: '/api/words/' + word,
    method: 'DELETE',
    success: (data) => cb(data),
    error: (error) => console.log('Error deleting word', error)
  });
};

var getCodes = function(cb) {
  $.ajax({
    method: 'GET',
    url: '/api/codes',
    success: (data) => cb(data),
    error: (err) => console.log('Error getting language codes', err)
  });
};

var getSentences = function(word, cb) {
  $.ajax({
    url: '/api/sentences/' + word,
    method: 'GET',
    contentType: 'application/json',
    success: (data) => cb(data),
    error: (err) => console.log('Error getting sentences from database', err)
  });
};

var getSavedSentences = function(cb) {
  $.ajax({
    url: '/api/savedsentences',
    method: 'GET',
    success: (data) => cb(data),
    error: (error) => console.log('Error getting saved sentences', error)
  });
};

var getContributedSentences = function(cb) {
  $.ajax({
    url: '/api/contributedsentences',
    method: 'GET',
    success: (data) => cb(data),
    error: (error) => console.log('Error getting contributed sentences', error)
  });
};

var addSentences = function(word, sentence, translation, url) {
  $.ajax({
    url: '/api/sentences',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({word: word, sentence: sentence, translation: translation, url: url}),
    success: (data) => console.log('Successfully added sentence'),
    error: (err) => console.log('Error adding sentence')
  });
};

var removeSavedSentence = function(url, cb) {
  axios.delete('/api/sentences/?' + url)
  .then(function(data) {
    cb(data);
  })
  .catch(function(error) {
    console.log('Error deleting sentence', error);
  });

};

var loginAjax = (username, password, cb) => {
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

  $.ajax({
    url: '/api/languages',
    method: 'GET',
    contentType: 'application/json',
    success: (data) => cb(data),
    error: (err) => console.log('Error getting languages from database', err)
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
    console.log('Error in recognizing audio', error);
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