var db = require('../dbconfig.js');
var Sentence = require('../models/sentence.js');

var Sentences = new db.Collection();
Sentences.model = Sentence;

module.exports = Sentence;
