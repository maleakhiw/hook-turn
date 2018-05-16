const path = require("path"); // TODO check if needed
const client = require('./googleAuth'); // Google Auth client
const tramData = require("../assets/json/tramstops.json");

// TODO MOVE CLIENT_ID TO ENV
const CLIENT_ID = "322407653477-6ntij30l1ttq9jgt82cmmljc5d515tmg.apps.googleusercontent.com";

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    client.verifyIdToken(
      token, CLIENT_ID,
      (error, login) => {
        if (error)
          reject(error);
        else
          resolve(login);
      }
    )
  });
}

let getPage = (req, res) => {
  if (req.query.search) {
    // maps a given stop name to the stop ID. TODO refactor to separate route?
    var stop_name = req.query.search;
    var stop_id;

    var isFound = false;
    for (var i=0; i<tramData["stops"].length; i++) {
      if (tramData["stops"][i]["stop_name"].includes(stop_name)) {
        stop_id = tramData["stops"][i]["stop_id"];
        isFound = true;
        break;
      }
    }

    if (!isFound) {
      res.redirect('/search');
    } else {  // redirect to Angular app
      res.redirect("/nextram?stop_id=" + stop_id);
    }
  }
  else {
    // no query
    // TODO redirect to search?
    res.sendFile(path.join(__dirname, "/../nextram-angular/dist/nextram-angular/index.html"))
  }
}

let reportCrowdedness = (req, res) => {
  verifyToken.then(login => {
    var payload = login.getPayload();
    var userid = payload.sub;
    if (!userid) {
      // TODO status: 'error' instead of 'fail'
      res.status(400).json({status: 'fail', reason: 'Invalid Google login token.'});
      return; // TODO change to throw err
    }

    let userInput = {
      userID: userid,
      runID: req.body.run_id,
      stopID: req.body.stop_id,
      crowdednessLevel: req.body.crowdedness,
    }

    return Crowdedness.create(userInput);
  })
  .then(userInput => {
    res.json({status: 'success'})

    return User.findOne({userID: userid})
  })
  .then(user => {
    if (!user) {
      return User.create({
        userID: userid,
        email: payload.email,
        firstName: payload.given_name,
        lastName: payload.family_name
      })
    }
  })
  .then(results => {
    // NOTE do nothing
  })
  .catch(err => {
    // TODO change to Winston.err
    console.log(err);
    res.status(503).json({status: 'error'});
  })
}

let reportDisruption = (req, res) => {
  verifyToken.then(login => {
    var payload = login.getPayload();
    var userid = payload['sub'];
    if (!userid) {
      // TODO status: 'error' instead of 'fail'
      res.status(400).json({status: 'fail', reason: 'Invalid Google login token.'});
      return; // TODO change to throw err
    }

    var disruption = new Disruption({
      "status": req.body.status,
      "runID": req.body.runID,
      "stopID": req.body.stopID,
      "disruption": req.body.disruption,
      "userID": userid
    });

    return disruption.save();
  })
  .then(newDisruption => {
    return User.findOne({userID: userid})
  })
  .then(user => {
    if (!user) {
      return User.create({
        userID: userid,
        email: payload['email'],
        firstName: payload['given_name'],
        lastName: payload['family_name']
      });
    }
  })
  .then(user => {
    // do nothing
  })
  .catch(err => {
    // TODO change to Winston.err
    console.log(err);
  })
}

module.exports = {
  getPage: getPage,
  reportDisruption: reportDisruption,
  reportCrowdedness: reportCrowdedness
}
