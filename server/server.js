const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db/dbconfig');
var handler = require('./request-handler');
var session = require('express-session');
var s3Handler = require('./s3handler');
var morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json({limit: '50mb'}));

app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.text({defaultCharset: 'utf-8'}));
app.use(session({
  secret: 'heroic translating hamsters',
  resave: true,
  rolling: true,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, '../client')));

var checkUser = function(req, res, next) {
  // Nasty hack for working well with jQuery redirecting
  // var loginPage = req.headers.origin + '/login'
  // res.json({notAuthorized:loginPage});
  if (req.session.user) {
    return next();
  } else {
    res.redirect('/login');
  }
};

app.post('/api/signup', handler.createUser);
app.post('/api/login', handler.verifyUser);
app.get('/api/languages', handler.getLanguages);

/*=================== Secured Routes =======================*/

app.post('/api/sentences', checkUser, handler.createSentence);
app.get('/api/sentences/:word', checkUser, handler.listWordSentences);
app.get('/api/savedsentences', checkUser, handler.listSavedSentences);
app.get('/api/contributedsentences', checkUser, handler.listCreatedSentences);
app.post('/api/users/sentences', checkUser, handler.saveSentence);
app.post('/api/words', checkUser, handler.addWord);
app.get('/api/words', checkUser, handler.getWords);
app.post('/api/languages', checkUser, handler.setDefaultLanguage);
app.get('/api/codes', checkUser, handler.getCodes);
app.post('/api/upload', checkUser, s3Handler.uploadAudio);
app.post('/api/vision', checkUser, handler.getLabels);
app.post('/api/speech', checkUser, handler.audioToSpeech);
app.delete('/api/sentences/:url?', checkUser, handler.unsaveSentence);
app.delete('/api/words/:text', checkUser, handler.unsaveWord);


/*========================================================*/

app.get('*', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

app.listen(3000, function() {
  console.log('App is now listening on port 3000');
});

module.exports = app;
