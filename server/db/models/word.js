const db = require('../dbconfig.js');

require('./sentence.js');
require('./user.js');
var Word = db.model('Word', {
  tableName: 'words',
  sentence: function() {
    return this.hasOne('Sentence');
  },
  users: function() {
    return this.belongsToMany('User', 'user_words');
  }
});


module.exports = Word;
