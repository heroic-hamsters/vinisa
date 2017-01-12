const db = require('../dbconfig.js');
require('./word.js');
require('./language.js');
var TranslatedWord = db.model('TranslatedWord', {
  tableName: 'translated_words',
  word: function() {
    return this.belongsTo('Word');
  },
  language: function() {
    return this.belongsTo('Language');
  }
});

module.exports = TranslatedWord;