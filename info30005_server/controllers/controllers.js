const departures  = require('./departures');
const nextram = require('./nextram');

module.exports = {
  departures: departures,
  nextram: nextram,
}

/*
WAS auth.js
// TODO check if this is even useful
module.exports = (req, res) => {
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
  )
}

*/
