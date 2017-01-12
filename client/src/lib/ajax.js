import $ from 'jquery';

var getWords = function(username, cb) {
  $.ajax({
    url: '/api/words/' + username,
    method: 'GET',
    contentType: 'application/json',
    success: (data) => cb(data),
    error: (err) => console.log('Error getting words from the database', err)
  });
};

var addWord = function(username, text) {
  $.ajax({
    url: '/api/words',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({username: username, text: text}),
    success: (data) => console.log('Successfully added word to user'),
    error: (err) => console.log('Error adding word to user', err)
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

var signupAjax = function(username, password, nativeLanguage, learnLanguage) {

  $.ajax({
    url: '/api/signup',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({username: username, password: password, nativeLanguage: nativeLanguage, learnLanguage: learnLanguage}),
    success: (data) => console.log(data),
    error: (err) => {
      console.log('Error signing up', err);
    }
  });
};

module.exports = {
  getWords: getWords,
  addWord: addWord,
  getSentences: getSentences,
  addSentences: addSentences,
  signupAjax: signupAjax
};