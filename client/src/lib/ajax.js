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

var addWord = function(text, translation) {
  $.ajax({
    url: '/api/words',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({translation: translation, text: text}),
    success: (data) => console.log('Successfully added word to user'),
    error: (err) => console.log('Error adding word to user', err)
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

var saveSentence = function(text) {
  $.ajax({
    url: '/api/users/sentences',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({text: text}),
    success: (data) => console.log('Added sentence to user'),
    error: (err) => console.log('Error adding sentence to user')
  });
};

var getLabels = function(request, cb) {
  $.ajax({
    url: '/api/vision',
    method: 'POST',
    data: JSON.stringify(request),
    success: (data) => cb(data),
    error: (error) => console.log('Error in getting labels')
  });
};

module.exports = {
  getWords: getWords,
  addWord: addWord,
  getSentences: getSentences,
  addSentences: addSentences,
  loginAjax: loginAjax,
  signupAjax: signupAjax,
  getLanguages: getLanguages,
  getCodes: getCodes,
  addLanguage: addLanguage
};