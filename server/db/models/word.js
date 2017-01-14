const db = require('../dbconfig.js');

require('./sentence.js');
require('./user.js');
require('./language.js');
var Word = db.model('Word', {
  tableName: 'words',
  sentences: function() {
    return this.hasMany('Sentence');
  },
  languages: function() {
    return this.belongsToMany('Language', 'translated_words').withPivot('translation');
  }
});


module.exports = Word;
