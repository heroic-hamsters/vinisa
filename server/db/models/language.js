const db = require('../dbconfig.js');

require('./user');
require('./sentence');
require('./word');

var Language = db.model('Language', {
  tableName: 'languages',
  learnUsers: function() {
    return this.belongsToMany('User', 'user_languages');
  },
  words: function() {
    return this.belongsToMany('Word', 'translated_words').withPivot('translation');
  },
  sentences: function() {
    return this.belongsToMany('Sentence', 'translated_sentences').withPivot('translation');
  },
  nativeUsers: function() {
    return this.hasOne('User');
  }

});

module.exports = Language;