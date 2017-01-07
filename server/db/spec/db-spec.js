var expect = require('chai').expect;
var request = require('request');
var db = require('../dbconfig');
var Word = require('../models/word');
var User = require('../models/user');
var Sentence = require('../models/sentence');
var Words = require('../collections/words');
var Users = require('../collections/users');
var Sentences = require('../collections/sentences');
var Promise = require('bluebird');


describe('Language Learning Database', function() {
  beforeEach(function() {
    new User().where({username: 'Steve'}).fetch({withRelated: ['sentences']})
    .then(function(user) {
      user.sentences().detach();
    });

    new Sentence()
    .where({text: 'This is testing our database'})
    .destroy();

    new Word()
    .where({text: 'Testing'})
    .destroy();

    new User()
    .where({username: 'Steve'})
    .destroy();



  });

  describe('Inserting data into tables', function() {
    var user;
    var word;
    var sentence;

    beforeEach(function() {
      user = new User({username: 'Steve', password: 'Steve'});

      word = new Word({text: 'Testing'});

    });

    it('Should insert user into the database', function(done) {
      user.save();
      new User()
      .where({username: 'Steve'})
      .fetch()
      .then(function(foundUser) {
        // console.log(foundUser.toJSON())
        expect(foundUser.toJSON().username).to.equal('Steve');
      });
      new User()
      .where({username: 'Steve'})
      .destroy();
      done();
    });

    it('Should insert a word into the database', function(done) {
      word.save();
      new Word()
      .where({text: 'Testing'})
      .fetch()
      .then(function(foundWord) {
        expect(foundWord.toJSON().text).to.equal('Testing');
      });
      new Word()
      .where({text: 'Testing'})
      .destroy();
      done();
    });

    it('Should insert a sentence into the database', function(done) {
      // word.save();
      // user.save();
      var wordId;
      var creatorId;
      Promise.all([user.save(), word.save()])
      .then(function() {
        return Promise.all([user.fetch().then(function(foundUser) {
          creatorId = foundUser.toJSON().id;
        }), word.fetch().then(function(foundWord) {
          wordId = foundWord.toJSON().id;
        })]);
      })
      .then(function() {
        new Sentence({text: 'This is testing our database', url: 'thisisatest.com', word_id: wordId, creator_id: creatorId})
        .save()
        .then(function(newSentence) {
          expect(newSentence.toJSON().text).to.equal('This is testing our database');
        });
        done();
      });

    });

    it('Should insert a word and user into the join table', function(done) {
      Promise.all([user.save(), word.save()])
      .then(function() {
        return user.words().attach(word);
      });

      new User().where({username: 'Steve'}).fetchAll({withRelated: ['words']}).then(function(results) {
        expect(results.toJSON().length).to.equal(1);
        expect(results.toJSON()[0].username).to.equal('Steve');
      });

      new User().where({username: 'Steve'}).fetch({withRelated: ['words']})
      .then(function(user) {
        return user.words().detach();


      });
      done();
    });
    it('Should insert a user and a sentence into the join table', function(done) {
      var wordId;
      var creatorId;
      var sentence;
      Promise.all([user.save(), word.save()])
      .then(function() {
        return Promise.all([user.fetch().then(function(foundUser) {
          creatorId = foundUser.toJSON().id;
        }), word.fetch().then(function(foundWord) {
          wordId = foundWord.toJSON().id;
        })]);
      })
      .then(function() {
        sentence = new Sentence({text: 'This is testing our database', url: 'thisisatest.com', word_id: wordId, creator_id: creatorId});

        return sentence.save();

      })
      .then(function(newSentence) {
        console.log(newSentence);
        user.sentences().attach(newSentence);
        new User().where({username: 'Steve'}).fetch({withRelated: ['sentences']})
        .then(function(results) {
          console.log(results.toJSON());
          expect(results.toJSON().length).to.equal(1);
          expect(results.toJSON()[0].username).to.equal('Steve');
        });
      });

      new User().where({username: 'Steve'}).fetch({withRelated: ['sentences']})
      .then(function(user) {
        return user.sentences().detach();
      }).then(function() {
        done();
      });
    });
  });
});