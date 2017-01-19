import $ from 'jquery';

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
  $.ajax({
    url: '/api/sentences/?' + url,
    method: 'DELETE',
    success: (data) => cb(data),
    error: (error) => console.log('Error deleting sentence', error)
  });
};

var loginAjax = (username, password, cb) => {
  $.ajax({
    url: '/api/login',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({username: username, password: password}),
    success: (data) => {
      cb({authenticated: true});
    },
    error: (data) => {
      cb({authenticated: false});
    }
  });
};

var signupAjax = function(username, password, nativeLanguage, learnLanguage, cb) {
  $.ajax({
    url: '/api/signup',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({username: username, password: password, nativeLanguage: nativeLanguage, learnLanguage: learnLanguage}),
    success: (data) => {
      cb({authenticated: true});
    },
    error: (data) => {
      cb({authenticated: false});
    }
  });
};

var getLanguages = function(cb) {
  $.ajax({
    url: '/api/languages',
    method: 'GET',
    contentType: 'application/json',
    success: (data) => cb(data),
    error: (err) => console.log('Error getting languages from database', err)
  });
};

var addLanguage = function(language) {
  $.ajax({
    url: '/api/languages',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({language: language}),
    success: (data) => console.log('Added new language to user'),
    error: (err) => console.log('Error adding language to user')
  });
};

var saveSentence = function(url) {
  $.ajax({
    url: '/api/users/sentences',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({url: url}),
    success: (data) => console.log('Added sentence to user'),
    error: (err) => console.log('Error adding sentence to user')
  });
};

var getLabels = function(request, cb) {
  $.ajax({
    url: '/api/vision',
    method: 'POST',
    data: {request: request},
    success: (data) => cb(data),
    error: (error) => console.log('Error in getting labels')
  });
};

var recognizeAudio = function(request, cb) {
  $.ajax({
    url: '/api/speech',
    method: 'POST',
    data: {request: request},
    success: (data) => cb(data),
    error: (error) => console.log('Error in recognizing audio', error)
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