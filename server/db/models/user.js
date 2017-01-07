const db = require('../dbconfig.js');
// var Word = require('./word');

require('./word');

var User = db.model('User', {
  tableName: 'users',
  hidden: ['password'],
  sentences: function() {
    return this.belongsToMany('Sentence', 'user_sentences');
  },
  words: function() {
    return this.belongsToMany('Word', 'user_words');
  },
  createdSentence: () => this.hasOne('Sentence'),

});

module.exports = User;
