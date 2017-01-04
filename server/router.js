const router = require('express').Router();
const handler = require('./request-handler');

router.route('/words')
  .get(handler.getWords);
  // .post(handler.wordHandler);

router.route('/sentences')
  .post(handler.listSentences);
//
router.route('/user')
  .post(handler.userHandler);

module.exports = router;
