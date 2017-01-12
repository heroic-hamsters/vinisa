var Word = require('./models/word.js');
var Words = require('./collections/words.js');
var User = require('./models/user.js');
var Promise = require('bluebird');
var db = require('./dbconfig');
var Sentence = require('./models/sentence');
var Languages = require('./collections/languages.js');
var Language = require('./models/language.js');
var TranslatedWord = require('./models/translatedWord');

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


// var data = {
//   "data": {
//     "languages": [
//       {
//         "language": "af",
//         "name": "Afrikaans"
//       },
//       {
//         "language": "sq",
//         "name": "Albanian"
//       },
//       {
//         "language": "am",
//         "name": "Amharic"
//       },
//       {
//         "language": "ar",
//         "name": "Arabic"
//       },
//       {
//         "language": "hy",
//         "name": "Armenian"
//       },
//       {
//         "language": "az",
//         "name": "Azerbaijani"
//       },
//       {
//         "language": "eu",
//         "name": "Basque"
//       },
//       {
//         "language": "be",
//         "name": "Belarusian"
//       },
//       {
//         "language": "bn",
//         "name": "Bengali"
//       },
//       {
//         "language": "bs",
//         "name": "Bosnian"
//       },
//       {
//         "language": "bg",
//         "name": "Bulgarian"
//       },
//       {
//         "language": "ca",
//         "name": "Catalan"
//       },
//       {
//         "language": "ceb",
//         "name": "Cebuano"
//       },
//       {
//         "language": "ny",
//         "name": "Chichewa"
//       },
//       {
//         "language": "zh",
//         "name": "Chinese (Simplified)"
//       },
//       {
//         "language": "zh-TW",
//         "name": "Chinese (Traditional)"
//       },
//       {
//         "language": "co",
//         "name": "Corsican"
//       },
//       {
//         "language": "hr",
//         "name": "Croatian"
//       },
//       {
//         "language": "cs",
//         "name": "Czech"
//       },
//       {
//         "language": "da",
//         "name": "Danish"
//       },
//       {
//         "language": "nl",
//         "name": "Dutch"
//       },
//       {
//         "language": "en",
//         "name": "English"
//       },
//       {
//         "language": "eo",
//         "name": "Esperanto"
//       },
//       {
//         "language": "et",
//         "name": "Estonian"
//       },
//       {
//         "language": "tl",
//         "name": "Filipino"
//       },
//       {
//         "language": "fi",
//         "name": "Finnish"
//       },
//       {
//         "language": "fr",
//         "name": "French"
//       },
//       {
//         "language": "fy",
//         "name": "Frisian"
//       },
//       {
//         "language": "gl",
//         "name": "Galician"
//       },
//       {
//         "language": "ka",
//         "name": "Georgian"
//       },
//       {
//         "language": "de",
//         "name": "German"
//       },
//       {
//         "language": "el",
//         "name": "Greek"
//       },
//       {
//         "language": "gu",
//         "name": "Gujarati"
//       },
//       {
//         "language": "ht",
//         "name": "Haitian Creole"
//       },
//       {
//         "language": "ha",
//         "name": "Hausa"
//       },
//       {
//         "language": "haw",
//         "name": "Hawaiian"
//       },
//       {
//         "language": "iw",
//         "name": "Hebrew"
//       },
//       {
//         "language": "hi",
//         "name": "Hindi"
//       },
//       {
//         "language": "hmn",
//         "name": "Hmong"
//       },
//       {
//         "language": "hu",
//         "name": "Hungarian"
//       },
//       {
//         "language": "is",
//         "name": "Icelandic"
//       },
//       {
//         "language": "ig",
//         "name": "Igbo"
//       },
//       {
//         "language": "id",
//         "name": "Indonesian"
//       },
//       {
//         "language": "ga",
//         "name": "Irish"
//       },
//       {
//         "language": "it",
//         "name": "Italian"
//       },
//       {
//         "language": "ja",
//         "name": "Japanese"
//       },
//       {
//         "language": "jw",
//         "name": "Javanese"
//       },
//       {
//         "language": "kn",
//         "name": "Kannada"
//       },
//       {
//         "language": "kk",
//         "name": "Kazakh"
//       },
//       {
//         "language": "km",
//         "name": "Khmer"
//       },
//       {
//         "language": "ko",
//         "name": "Korean"
//       },
//       {
//         "language": "ku",
//         "name": "Kurdish (Kurmanji)"
//       },
//       {
//         "language": "ky",
//         "name": "Kyrgyz"
//       },
//       {
//         "language": "lo",
//         "name": "Lao"
//       },
//       {
//         "language": "la",
//         "name": "Latin"
//       },
//       {
//         "language": "lv",
//         "name": "Latvian"
//       },
//       {
//         "language": "lt",
//         "name": "Lithuanian"
//       },
//       {
//         "language": "lb",
//         "name": "Luxembourgish"
//       },
//       {
//         "language": "mk",
//         "name": "Macedonian"
//       },
//       {
//         "language": "mg",
//         "name": "Malagasy"
//       },
//       {
//         "language": "ms",
//         "name": "Malay"
//       },
//       {
//         "language": "ml",
//         "name": "Malayalam"
//       },
//       {
//         "language": "mt",
//         "name": "Maltese"
//       },
//       {
//         "language": "mi",
//         "name": "Maori"
//       },
//       {
//         "language": "mr",
//         "name": "Marathi"
//       },
//       {
//         "language": "mn",
//         "name": "Mongolian"
//       },
//       {
//         "language": "my",
//         "name": "Myanmar (Burmese)"
//       },
//       {
//         "language": "ne",
//         "name": "Nepali"
//       },
//       {
//         "language": "no",
//         "name": "Norwegian"
//       },
//       {
//         "language": "ps",
//         "name": "Pashto"
//       },
//       {
//         "language": "fa",
//         "name": "Persian"
//       },
//       {
//         "language": "pl",
//         "name": "Polish"
//       },
//       {
//         "language": "pt",
//         "name": "Portuguese"
//       },
//       {
//         "language": "pa",
//         "name": "Punjabi"
//       },
//       {
//         "language": "ro",
//         "name": "Romanian"
//       },
//       {
//         "language": "ru",
//         "name": "Russian"
//       },
//       {
//         "language": "sm",
//         "name": "Samoan"
//       },
//       {
//         "language": "gd",
//         "name": "Scots Gaelic"
//       },
//       {
//         "language": "sr",
//         "name": "Serbian"
//       },
//       {
//         "language": "st",
//         "name": "Sesotho"
//       },
//       {
//         "language": "sn",
//         "name": "Shona"
//       },
//       {
//         "language": "sd",
//         "name": "Sindhi"
//       },
//       {
//         "language": "si",
//         "name": "Sinhala"
//       },
//       {
//         "language": "sk",
//         "name": "Slovak"
//       },
//       {
//         "language": "sl",
//         "name": "Slovenian"
//       },
//       {
//         "language": "so",
//         "name": "Somali"
//       },
//       {
//         "language": "es",
//         "name": "Spanish"
//       },
//       {
//         "language": "su",
//         "name": "Sundanese"
//       },
//       {
//         "language": "sw",
//         "name": "Swahili"
//       },
//       {
//         "language": "sv",
//         "name": "Swedish"
//       },
//       {
//         "language": "tg",
//         "name": "Tajik"
//       },
//       {
//         "language": "ta",
//         "name": "Tamil"
//       },
//       {
//         "language": "te",
//         "name": "Telugu"
//       },
//       {
//         "language": "th",
//         "name": "Thai"
//       },
//       {
//         "language": "tr",
//         "name": "Turkish"
//       },
//       {
//         "language": "uk",
//         "name": "Ukrainian"
//       },
//       {
//         "language": "ur",
//         "name": "Urdu"
//       },
//       {
//         "language": "uz",
//         "name": "Uzbek"
//       },
//       {
//         "language": "vi",
//         "name": "Vietnamese"
//       },
//       {
//         "language": "cy",
//         "name": "Welsh"
//       },
//       {
//         "language": "xh",
//         "name": "Xhosa"
//       },
//       {
//         "language": "yi",
//         "name": "Yiddish"
//       },
//       {
//         "language": "yo",
//         "name": "Yoruba"
//       },
//       {
//         "language": "zu",
//         "name": "Zulu"
//       }
//     ]
//   }
// };

// for (var i = 0; i < data.data.languages.length; i++) {
//   new Language({name: data.data.languages[i].name, language: data.data.languages[i].language}).save();
// }

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