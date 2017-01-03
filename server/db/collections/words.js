var db = require('../dbconfig.js');
var Word = require('../models/word.js');

var Words = new db.Collection();
Words.model = Word;

module.exports = Words;