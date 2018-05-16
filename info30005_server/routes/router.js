const express = require('express');
const router  = express.Router();
const api     = require('./api');
const main    = require('./main');

router.use('/api', api);
router.use(main);

module.exports = router;
