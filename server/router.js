const router = require('express').Router();
const handler = require('./request-handler');

router.route('/word')
  .post(handler.wordHandler);

router.route('/sentence')
  .post(handler.listSentences);

router.route('/user')
  .post(handler.userHandler);

module.exports = router;
