var db = require('../dbconfig.js');
var Word = require('../models/sentence.js');

var Sentences = new db.Collection();
Sentences.model = Sentence;

module.exports = Sentence;