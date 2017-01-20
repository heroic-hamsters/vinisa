var Promise = require('bluebird');
var path = require('path');
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'translate',
    charset: 'utf8',
  },
  useNullAsDefault: true
});

var db = require('bookshelf')(knex);

//https://github.com/tgriesser/bookshelf/wiki/Plugin:-Model-Registry
db.plugin('registry');

// https://github.com/tgriesser/bookshelf/wiki/Plugin:-Visibility
db.plugin('visibility');

Promise.all([
  db.knex.schema.hasTable('languages')
  .then(function(exists) {
    if (!exists) {
      return db.knex.schema.createTable('languages', function(table) {
        table.increments('id').primary();
        table.string('speechCode', 255).unique();
        table.string('name', 255).unique();
        table.string('translateCode', 255).unique();
      }).then(function(table) {
        console.log('Created table languages');
      });
    }
  }),
  db.knex.schema.hasTable('words').then(function(exists) {
    if (!exists) {
      return db.knex.schema.createTable('words', function(table) {
        table.increments('id').primary();
        table.string('text', 255).unique();
      }).then(function(table) {
        console.log('Created table words');
      });
    }
  })
])
.then(() => {
  return db.knex.schema.hasTable('users').then(function(exists) {
    if (!exists) {
      return db.knex.schema.createTable('users', function(user) {
        user.increments('id').primary();
        user.string('username', 255).unique();
        user.string('password', 255);
        user.integer('native_language', 255).references('id').inTable('languages').unsigned();
        user.integer('learn_language', 255).references('id').inTable('languages').unsigned();
      }).then(function(table) {
        console.log('Created table users');
      });
    }
  });

})
.then(() => {
  return Promise.all([
    db.knex.schema.hasTable('sentences').then(function(exists) {
      if (!exists) {
        return db.knex.schema.createTable('sentences', function(table) {
          table.increments('id').primary();
          table.string('text', 255);
          table.string('url', 255);
          table.integer('language_id').references('id').inTable('languages').unsigned();
          table.integer('word_id').references('id').inTable('words').unsigned();
          table.integer('creator_id').references('id').inTable('users').unsigned();
        }).then(function (table) {
          console.log('Created table sentences');
        });
      }
    }),
    db.knex.schema.hasTable('translated_words').then(function(exists) {
      if (!exists) {
        db.knex.schema.createTable('translated_words', function(table) {
          table.increments('id').primary();
          table.integer('word_id').references('id').inTable('words').unsigned();
          table.integer('language_id').references('id').inTable('languages').unsigned();
          table.string('translation', 255);
          table.unique(['word_id', 'language_id', 'translation']);
        }).then(function(table) {
          console.log('Created table translated words');
        });
      }
    })

  ]);
})

.then(() => {
  return Promise.all([
    db.knex.schema.hasTable('user_sentences').then(function(exists) {
      if (!exists) {
        return db.knex.schema.createTable('user_sentences', function(table) {
          table.increments('id').primary();
          table.integer('sentence_id').references('id').inTable('sentences').unsigned();
          table.integer('user_id').references('id').inTable('users').unsigned();
          table.unique(['sentence_id', 'user_id']);
        }).then(function(table) {
          console.log('Created table user sentences');
        });
      }
    }),

    db.knex.schema.hasTable('user_languages').then(function(exists) {
      if (!exists) {
        return db.knex.schema.createTable('user_languages', function(table) {
          table.increments('id').primary();
          table.integer('user_id').references('id').inTable('users').unsigned();
          table.integer('language_id').references('id').inTable('languages').unsigned();
          table.unique(['user_id', 'language_id']);
        }).then(function(table) {
          console.log('Created table user languages');
        });
      }
    })
  ]);
})
.then(() => {
  return Promise.all([
    db.knex.schema.hasTable('user_words').then(function(exists) {
      if (!exists) {
        return db.knex.schema.createTable('user_words', function(table) {
          table.increments('id').primary();
          table.integer('user_id').references('id').inTable('users').unsigned();
          table.integer('translated_word_id').references('id').inTable('translated_words').unsigned();
          table.unique(['user_id', 'translated_word_id']);
        }).then(function(table) {
          console.log('Created table user words');
        });
      }
    }),
    db.knex.schema.hasTable('translated_sentences').then(function(exists) {
      if (!exists) {
        return db.knex.schema.createTable('translated_sentences', function(table) {
          table.increments('id').primary();
          table.integer('language_id').references('id').inTable('languages').unsigned();
          table.integer('sentence_id').references('id').inTable('sentences').unsigned();
          table.string('translation', 255);
        }).then(function(table) {
          console.log('Created table translated sentences');
        });
      }
    })
  ]);
});



module.exports = db;
