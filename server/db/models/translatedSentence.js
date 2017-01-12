const db = require('../dbconfig.js');
require('./sentence.js');
require('./language.js');
const TranslatedSentence = db.model('TranslatedSentence', {
  tableName: 'translated_sentences',
  sentence: function() {
    return this.belongsTo('Sentence');
  },
  language: function() {
    return this.belongsTo('Language');
  }
});