const db = require('../dbconfig.js');

const Sentence = db.Model.extend({
  tableName: 'sentences',
  creator: () => this.belongsTo(User),
  word: () => this.belongsTo(Word),
  users: () => this.belongsToMany(User, 'user_sentences', 'user_id', 'sentence_id')

});

module.exports = Sentence;
