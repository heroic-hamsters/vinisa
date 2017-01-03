const router = require('express').Router();
const handler = require('./request-handler');

router.route('/words/')
  .get(handler.what);


module.exports = router;
