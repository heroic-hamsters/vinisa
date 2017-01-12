const db = require('../dbconfig.js');

require('./word.js');
require('./user.js');
const Sentence = db.model('Sentence', {
  tableName: 'sentences',
  creator: function() {
    return this.belongsTo('User');
  },
  word: function() {
    return this.belongsTo('Word');
  },
  users: function() {
    return this.belongsToMany('User', 'user_sentences');
  },
  languages: function() {
    return this.belongsToMany('Language', 'translate_sentences').withPivot('translation');
  }

});

module.exports = Sentence;
