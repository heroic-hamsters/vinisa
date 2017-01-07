import $ from 'jquery';

var getWords = function(username, cb) {
  $.ajax({
    url: '/api/users/words',
    method: 'GET',
    contentType: 'application/json',
    success: (data) => cb(data),
    error: (err) => console.log('Error getting words from the database', err)
  });
};

var addWord = function(username, word, cb) {
  $.ajax({
    url: '/api/users/words',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({username: username, text: word}),
    success: ()
  })
};