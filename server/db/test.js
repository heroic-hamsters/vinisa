var Word = require('./models/word.js');
var Words = require('./collections/words.js');
var User = require('./models/user.js');
var Promise = require('bluebird');
var db = require('./dbconfig');
var Sentence = require('./models/sentence');

// User
// .where({id: 66})
// .fetchAll({withRelated: ['words']})
// .destroy();
new User().where({username: 'Steve'}).fetch({withRelated: ['words']})
.then(function(results) {
  console.log(results.toJSON());
});
// new Word({text: 'Testing'}).fetch()
// .then(function(word) {
//   console.log(word.id);
//   wordId = word.id;
//   return new User({username: 'Steve'}).fetch();
// }).then(function(user) {
//   creatorId = user.id;
//   new Sentence({text: 'This is a testing sentene', url: 'url', word_id: wordId, creator_id: creatorId}).save();
// });
// db.knex('user_words').where('user_id', 66).del();
// var user = new User({username: 'Jack', password: 'Jack'});

var word = new Word({text: 'Jack'});

// Promise.all([user.save(), word.save()])
// .then(function() {
//   console.log('saved');
//   // console.log(word.get('id'));
//   user.words().attach(word);
//   // return user.words.attach(word.get('id'));
// });

// User.where({username: 'sam'})
// .fetch()
// .then(function(user) {
//   console.log(user.toJSON());
// });