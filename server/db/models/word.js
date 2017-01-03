const db = require('../dbconfig.js');

const Word = db.Model.extend({
  tablename: 'words',
  sentence: () => this.hasOne(Sentence),
  users: () => this.belongsToMany(User, 'user_words', 'user_id', 'word_id')
});

module.exports = Word;