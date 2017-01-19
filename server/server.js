const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db/dbconfig');
var handler = require('./request-handler');
var session = require('express-session');
var s3Handler = require('./s3handler');
var morgan = require('morgan');
var ReactDOM = require('react-dom');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json({limit: '50mb'}));

app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.text({defaultCharset: 'utf-8'}));
app.use(session({
  secret: 'heroic translating hamsters',
  resave: false,
  saveUninitialized: true
}));

var checkUser = function(req, res, next) {
  // req.headers.origin
  // res.json({authenticated: false});
  // console.log('req.url: ', req.headers.origin);
  console.log(req.session.user);
  // res.redirect('/');
  var loginPage = req.headers.origin + '/login'
  res.json({notAuthorized:loginPage});

  // if (req.session.user) {
  //   res.redirect('/');
  //   // console.log('Looks good');
  //   // return next();
  // }
};
app.use(express.static(path.join(__dirname, '../client')));

app.post('/api/signup', handler.createUser);
app.post('/api/login', handler.verifyUser);
app.post('/api/sentences', handler.createSentence);
app.get('/api/sentences/:word', handler.listWordSentences);
app.get('/api/savedsentences', handler.listSavedSentences);
app.get('/api/contributedsentences', handler.listCreatedSentences);
app.post('/api/users/sentences', handler.saveSentence);
app.post('/api/words', checkUser, handler.addWord);
app.get('/api/words', handler.getWords);
app.post('/api/languages', handler.setDefaultLanguage);
app.get('/api/languages', handler.getLanguages);
app.get('/api/codes', handler.getCodes);
app.post('/api/upload', s3Handler.uploadAudio);
app.post('/api/vision', handler.getLabels);
app.post('/api/speech', handler.audioToSpeech);
app.delete('/api/sentences/:url?', handler.unsaveSentence);
app.delete('/api/words/:text', handler.unsaveWord);
app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

app.listen(3000, function() {
  console.log('App is now listening on port 3000');
});

module.exports = app;
