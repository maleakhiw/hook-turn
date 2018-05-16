const cors = require('cors');
const express = require('express');

const controllers = require('../controllers/controllers');
const router = express.Router();

router.get('/departures', cors(), controllers.departures);

// route to handle sign in. We'll use the userid
// TODO check if this is ncessary
// router.post('/tokensignin', controllers.auth);

// report crowdedness
// TODO rename route from nextramdb to /crowdedness
router.post("/nextramdb", controllers.nextram.reportCrowdedness);

// TODO rename to /disruption
router.post('/reportdisruption', controllers.nextram.reportDisruption);

module.exports = router;
