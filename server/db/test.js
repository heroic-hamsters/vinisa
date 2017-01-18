var Word = require('./models/word.js');
var Words = require('./collections/words.js');
var User = require('./models/user.js');
var Promise = require('bluebird');
var db = require('./dbconfig');
var Sentence = require('./models/sentence');
var Languages = require('./collections/languages.js');
var Language = require('./models/language.js');
var TranslatedWord = require('./models/translatedWord');
var TranslatedSentence = require('./models/translatedSentence');
var knex = require('knex');

// User
// .where({id: 66})
// .fetchAll({withRelated: ['words']})
// .destroy();
// new User().where({username: 'Steve'}).fetch({withRelated: ['words']})
// .then(function(results) {
//   console.log(results.toJSON());
// });

// new User({username: 'Steve'}).createdSentence()
// .then(function(sentence) {
//   console.log(sentence);
// });
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




/*Add to the join table with translation
var language;
new Language({name: 'English'}).fetch().then(function(foundLanguage) {
  language = foundLanguage;
  console.log(language.id);
  new Word({text: 'apple'}).fetch().then(function(word) {
    word.languages().attach({language_id: language.id, translation: 'apple'});
  });

});
*/

/*Add User with both native and target language

var language;
new Language({'name': 'English'}).fetch()
.then(function(foundLanguage) {
  language = foundLanguage;
  return new User({username: 'sam', password: 'sam', native_language: foundLanguage.id});

})
.then(function(newUser) {
  return newUser.save();
})
.then(function(newUser) {
  newUser.targetLanguages().attach(language);
});
})
*/
/* Add a word to the users database
new Word({text: 'apple'}).fetch()
.then(function(foundWord) {
  return new TranslatedWord({word_id: foundWord.id}).fetch();
})
.then(function(translatedWord) {
  new User({username:'sam'}).fetch().then(function(foundUser) {
    console.log(translatedWord);
    console.log(foundUser);
    foundUser.words().attach(translatedWord);
  });

});
*/

//HOW TO UPDATE A FIELD
// new User().where({username: 'sam'}).save({learn_language: 12}, {method: 'update'});


// new User().where({username: 'sam'}).fetch({withRelated: 'words'}).then(function(results) {

// })

// new Word({text: 'cheese'}).fetch()
// .then(function(word) {
//   return word.languages().attach({language_id: 5, translation: 'cheese'});
// }).then(function() {

// new TranslatedWord().where({language_id: 5, word_id: 6}).fetch()
// .then(function(translatedWord) {
//   new User().where({username: 'sam'}).fetch().then(function(user) {
//     user.words().attach(translatedWord);
//   });
// });

// new User().where({username: 'sam'}).fetch({withRelated: 'words'})
// .then(function(results) {
//   // console.log(results.toJSON().words);
//   var words = results.toJSON().words;
//   Promise.map(words, function(word) {
//     // console.log(word);
//     if ( word.language_id === 5) {
//       return new Word({id: word.word_id}).fetch();

//     }
//   }).then(function(arr) {
//     console.log(arr.length);
//   });
  // var actualWords = words.map(function(model) {
  //   return new Word({id: model.word_id}).fetch();
  // });

  // console.log(actualWords[0].id);

// });
// new User({username: 'sam'}).fetch()
// .then(function(user) {
//   return user.targetLanguages().attach({language_id: 2});
// })
// .then(function() {
//   return new User({username: 'sam'}).fetch();
// })
// .then(function(user) {
//   user.save({learn_language: 2}, {method: 'update'});
// });

// new User({username: 'sam'}).fetch({withRelated: 'sentences'})
// .then(function(results) {
//   console.log(results.toJSON());
// });

// new Language({id: 5}).fetch()
// .then(function(language) {
//   language.learnUsers().attach(new User)
// })

// new TranslatedWord().where({word_id: 5}).fetch()
// .then(function(translatedWord) {
//   console.log(JSON.stringify(translatedWord));
// });

// new User().where({id: 1}).fetch({withRelated: 'words'})
// .then(function(user) {
//   console.log(user.words().relatedData.target.where({translated_word_id: 5, user_id: 1}));
//   // .then(function(model) {
//   //   console.log(model.toJSON());
//   // });
//   // user.words().relatedData.target.where({translated_word_id: 5})

// });

new User().where({id: 2}).fetch()
.then(function(user) {
  user.sentences().detach({sentence_id: 1});
});