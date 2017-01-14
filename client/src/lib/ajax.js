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

var addSentences = function(word, sentence, url) {
  $.ajax({
    url: '/api/sentences',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({word: word, sentence: sentence, url: url}),
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

module.exports = {
  getWords: getWords,
  addWord: addWord,
  getSentences: getSentences,
  addSentences: addSentences,
  loginAjax: loginAjax,
  signupAjax: signupAjax,
  getLanguages: getLanguages,
  getCodes: getCodes
};