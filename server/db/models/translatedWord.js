const db = require('../dbconfig.js');
require('./word.js');
require('./language.js');

var TranslatedWord = db.model('TranslatedWord', {
  tableName: 'translated_words',
  word: function() {
    return this.belongsTo('Word');
  },
  users: function() {
    this.belongsToMany('User', 'user_words');
  },
  language: function() {
    return this.belongsTo('Language');
  }
});

module.exports = TranslatedWord;