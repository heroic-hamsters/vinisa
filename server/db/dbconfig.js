var path = require('path');
var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'translate',
    charset: 'utf8'
  },
  useNullAsDefault: true
});

var db = require('bookshelf')(knex);

// https://github.com/tgriesser/bookshelf/wiki/Plugin:-Visibility
db.plugin('visibility');

db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function(user) {
      user.increments('id').primary();
      user.string('username', 255);
    }).then(function (table) {
      console.log('Created table', table);
    });
  }
});

db.knex.schema.hasTable('words').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('words', function(table) {
      table.increments('id').primary();
      table.string('text', 255);
    }).then(function(table) {
      console.log('Created table', table);
    });
  }
});

db.knex.schema.hasTable('sentences').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('sentences', function(table) {
      table.increments('id').primary();
      table.string('text', 255);
      table.string('url', 255);
      table.integer('word_id').references('words.id');
      table.integer('user_id').references('users.id');
    }).then(function (table) {
      console.log('Created table', table);
    });
  }
});

db.knex.schema.hasTable('user_sentences').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('user_sentences', function(table) {
      table.increments('id').primary();
      table.integer('user_id').references('users.id');
      table.integer('sentence_id').references('sentences.id');
    }).then(function(table) {
      console.log('Created table', table);
    });
  }
});

db.knex.schema.hasTable('user_words').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('user_words').then(function(table) {
      table.increments('id').primary();
      table.integer('user_id').references('users.id');
      table.integer('word_id').references('words.id');
    }).then(function(table) {
      console.log('Created table', table);
    });
  }
});


module.exports = db;
