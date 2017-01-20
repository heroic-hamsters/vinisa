'use strict';

var chai = require('chai');
var expect = chai.expect;
var request = require('request');


describe('Home page route', function() {
  it('should have a /home route', function() {
    request.get('https://vinisa.hr50.site/home', function(err, res, body) {
      it('should go to home page with /', function() {
        expect(res.statusCode === 200).to.be.true;
        if (err) {
          console.log('/home route error', err);
        }
      })
    })
  })
});

describe('/signup route', function() {
  it('should have a /signup route', function() {
    request.get('https://vinisa.hr50.site/signup', function(err, res, body) {
      it('should go to signup page with /signup', function() {
        expect(res.statusCode === 200).to.be.true;
        if (err) {
          console.log('/signup route error', err);
        }
      })
    })
  })
});


describe('/login route', function() {
  it('should have a /login route', function() {
    request.get('https://vinisa.hr50.site/login', function(err, res, body) {
      it('should go to login page with /login', function() {
        expect(res.statusCode === 200).to.be.true;
        if (err) {
          console.log('/login route error', err);
        }
      })
    })
  })
});

describe('/words route', function() {
  it('should have a /words route', function() {
    request.get('https://vinisa.hr50.site/words', function(err, res, body) {
      it('should go to words page with /words', function() {
        expect(res.statusCode === 200).to.be.true;
        if (err) {
          console.log('/words route error', err);
        }
      })
    })
  })
});

describe('/savedwords route', function() {
  it('should have a /savedwords route', function() {
    request.get('https://vinisa.hr50.site/savedwords', function(err, res, body) {
      it('should go to savedwords page with /savedwords', function() {
        expect(res.statusCode === 200).to.be.true;
        if (err) {
          console.log('/savedwords route error', err);
        }
      })
    })
  })
});
