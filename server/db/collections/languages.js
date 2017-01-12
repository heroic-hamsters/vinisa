const db = require('../dbconfig.js');
const Language = require('../models/language.js');

var Languages = new db.Collection();
Languages.model = Language;

module.exports = Languages;

