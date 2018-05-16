const cors = require('cors');
const express = require('express');

const controllers = require('../controllers/controllers');
const router = express.Router();

router.post('/tokensignin', (req, res) => {
  console.log('tokensignin')
  console.log(req.body)

  if (!req.body.idtoken) {
    res.status(400).json({status: 'error'});
    return;
  }

  client.verifyIdToken(
    req.body.idtoken, CLIENT_ID,
    (error, login) => {
      // TODO winston.log
      var payload = login.getPayload();
      var userID = payload.sub;
      // TODO do something with the payload
      res.send();
    }
  );

})

router.get('/departures', cors(), controllers.departures);
router.post('/crowdednesses', controllers.nextram.reportCrowdedness);
router.post('/disruptions', controllers.nextram.reportDisruption);

module.exports = router;
