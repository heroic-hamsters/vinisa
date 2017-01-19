var Language = require('./models/language');
// var db = require('./dbconfig');
var Promise = require('bluebird');

var languages = [
  {
    'translateCode': 'af',
    'name': 'Afrikaans',
    'speechCode': 'af-ZA'
  },
  {
    'translateCode': 'eu',
    'name': 'Basque',
    'speechCode': 'eu-ES'
  },
  {
    'translateCode': 'bg',
    'name': 'Bulgarian',
    'speechCode': 'bg-BG'
  },
  {
    'translateCode': 'ca',
    'name': 'Catalan',
    'speechCode': 'ca-ES'
  },
  {
    'translateCode': 'zh-TW',
    'name': 'Chinese',
    'speechCode': 'cmn-Hans-CN'
  },
  {
    'translateCode': 'hr',
    'name': 'Croatian',
    'speechCode': 'hr-HR'
  },
  {
    'translateCode': 'cs',
    'name': 'Czech',
    'speechCode': 'cs-CZ'
  },
  {
    'translateCode': 'da',
    'name': 'Danish',
    'speechCode': 'da-DK'
  },
  {
    'translateCode': 'nl',
    'name': 'Dutch',
    'speechCode': 'nl-NL'
  },
  {
    'translateCode': 'en',
    'name': 'English',
    'speechCode': 'en-US'
  },

  {
    'translateCode': 'tl',
    'name': 'Filipino',
    'speechCode': 'fil-PH'
  },
  {
    'translateCode': 'fi',
    'name': 'Finnish',
    'speechCode': 'fi-FI'
  },
  {
    'translateCode': 'fr',
    'name': 'French',
    'speechCode': 'fr-FR'
  },
  {
    'translateCode': 'gl',
    'name': 'Galician',
    'speechCode': 'gl-ES'
  },

  {
    'translateCode': 'de',
    'name': 'German',
    'speechCode': 'de-DE'
  },
  {
    'translateCode': 'el',
    'name': 'Greek',
    'speechCode': 'el-GR'
  },
  {
    'translateCode': 'iw',
    'name': 'Hebrew',
    'speechCode': 'he-IL'
  },
  {
    'translateCode': 'hi',
    'name': 'Hindi',
    'speechCode': 'hi-IN'
  },
  {
    'translateCode': 'hu',
    'name': 'Hungarian',
    'speechCode': 'hu-HU'
  },
  {
    'translateCode': 'is',
    'name': 'Icelandic',
    'speechCode': 'is-IS'
  },

  {
    'translateCode': 'id',
    'name': 'Indonesian',
    'speechCode': 'id-ID'
  },
  {
    'translateCode': 'it',
    'name': 'Italian',
    'speechCode': 'it-IT'
  },
  {
    'translateCode': 'ja',
    'name': 'Japanese',
    'speechCode': 'ja-JP'
  },
  {
    'translateCode': 'ko',
    'name': 'Korean',
    'speechCode': 'ko-KR'
  },

  {
    'translateCode': 'lt',
    'name': 'Lithuanian',
    'speechCode': 'lt-LT'
  },

  {
    'translateCode': 'ms',
    'name': 'Malay',
    'speechCode': 'ms-MY'
  },


  {
    'translateCode': 'no',
    'name': 'Norwegian',
    'speechCode': 'ng-NO'
  },

  {
    'translateCode': 'fa',
    'name': 'Persian',
    'speechCode': 'fa-IR'
  },
  {
    'translateCode': 'pl',
    'name': 'Polish',
    'speechCode': 'pl-PL'
  },
  {
    'translateCode': 'pt',
    'name': 'Portuguese',
    'speechCode': 'pt-PT'
  },

  {
    'translateCode': 'ro',
    'name': 'Romanian',
    'speechCode': 'ro-RO'
  },
  {
    'translateCode': 'ru',
    'name': 'Russian',
    'speechCode': 'ru-RU'
  },

  {
    'translateCode': 'sr',
    'name': 'Serbian',
    'speechCode': 'sr-RS'
  },

  {
    'translateCode': 'sk',
    'name': 'Slovak',
    'speechCode': 'sk-SK'
  },
  {
    'translateCode': 'sl',
    'name': 'Slovenian',
    'speechCode': 'sl-SL'
  },
  {
    'translateCode': 'es',
    'name': 'Spanish',
    'speechCode': 'es-US'
  },

  {
    'translateCode': 'th',
    'name': 'Thai',
    'speechCode': 'th-TH'
  },
  {
    'translateCode': 'tr',
    'name': 'Turkish',
    'speechCode': 'tr-TR'
  },
  {
    'translateCode': 'uk',
    'name': 'Ukrainian',
    'speechCode': 'uk-UA'
  },

  {
    'translateCode': 'vi',
    'name': 'Vietnamese',
    'speechCode': 'vi-VN'
  },

  {
    'translateCode': 'zu',
    'name': 'Zulu',
    'speechCode': 'zu-ZA'
  }
];

exports.runScript = () => {
  Promise.map(languages, function(language) {
    return new Language({translateCode: language.translateCode, name: language.name, speechCode: language.speechCode}).save();
  }).catch(function(err) {

    if (err.errno !== 1062) {
      throw err;
    }
  });
};

// Promise.map(languages, function(language) {
//   return new Language({translateCode: language.translateCode, name: language.name, speechCode: language.speechCode}).save();
// })
// .then(function() {
//   db.knex.destroy();
// })

// languages.forEach(function(language) {
//   new Language({translateCode: language.translateCode, name: language.name, speechCode: language.speechCode}).save();
// });

// console.log(languages.length);
