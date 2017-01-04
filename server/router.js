const router = require('express').Router();
const handler = require('./request-handler');

router.route('/word')
  .post(handler.wordHandler);

module.exports = router;
