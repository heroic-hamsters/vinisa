var Word = require('./models/word.js');
var Words = require('./collections/words.js');
var User = require('./models/user.js');
var Promise = require('bluebird');
var db = require('./dbconfig');

// User
// .where({id: 66})
// .fetchAll({withRelated: ['words']})
// .destroy();
// new User().where({username: 'Steve'}).fetch({withRelated: ['words']})
// .then(function(results) {
//   return results.words().detach();
// });
new User({username: 'Steve'}).fetch().then(function(user) {
  console.log(user.attributes);
});
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