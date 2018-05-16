const Database = require('../models/db.js');
const tramData = require("../assets/json/tramstops.json");
const PTV = require('./ptv.js');

const Crowdedness = Database.Crowdedness;
const Disruption = Database.Disruption;
const User = Database.User;

const ptv = new PTV(1000824, 'c269558f-5915-11e6-a0ce-06f54b901f07'); // TODO move to env_var

/* groups the departures by a combination of route and direction ID */
function groupByRouteDirectionID(ptvData) {
  var departures = ptvData.departures;
  var newDepartures = {};
  for (var i=0; i<departures.length; i++) {
    var key = departures[i].route_id + '-' + departures[i].direction_id;
    if (key in newDepartures) {
      newDepartures[key].push(departures[i]); // add to existing array
    }
    else {
      newDepartures[key] = [departures[i]]; // initialise new array
    }
  }

  return newDepartures;
}

module.exports = (req, res) => {
  var runCrowdedness = {};
  var disruptions = {};

  // Give an error if user does not put stopId as query parameter
  if (!req.query.stopid) {
    res.status(400).json({status: 'error'});
  }
  else {
   var stopID = req.query.stopid;
   ptv.departures(stopID, (error, response, body) => {
     try {
        var body = JSON.parse(body);
     } catch (SyntaxError) {
       res.status(400).json({status: 'error'})
       return;
     }

     if (!body || error || response.statusCode != 200 || response.headers['content-type'] == 'text/html') {
       res.status(400).json({status: 'error'})
       return;
     }

     var runIds = body.departures.map(entry => entry.run_id);
     Crowdedness.find({runID: {$in: runIds}, timeExpiry: {$gte: Date.now()}}).exec()
     .then(crowdedness => {
       crowdedness.map(entry => {
         if (!(entry.runID in runCrowdedness)) {
           // create initial entry
           runCrowdedness[entry.runID] = {crowdedness: Number(entry.crowdednessLevel), count: 1, average: 0};
         }
         else {
           // increment existing entry
           runCrowdedness[entry.runID].crowdedness += Number(entry.crowdednessLevel);
           runCrowdedness[entry.runID].count++;
         }
       })
       // calculate average reported crowdedness. TODO exponential decay weighted average
       for (var run in runCrowdedness) {
         runCrowdedness[run].average = Math.round(runCrowdedness[run].crowdedness / runCrowdedness[run].count);
         // Classify level of crowdedness
         if (runCrowdedness[run].average == 0) {
             runCrowdedness[run]["class"] = "Empty";
         }
         else if (runCrowdedness[run].average == 1) {
             runCrowdedness[run]["class"] = "Decent";
         }
         else if (runCrowdedness[run].average == 2) {
             runCrowdedness[run]["class"] = "Full";
         }
         else if (runCrowdedness[run].average == 3) {
             runCrowdedness[run]["class"] = "Overcrowded";
         }
       }

       return Disruption.find({runID: {$in: runIds}, timeExpiry: {$gte: Date.now()}})
     })
     .then(result => {
       result.map(entry => {
         if (!(entry.runID in disruptions)) {  // key does not exist, create
           disruptions[entry.runID] = [entry.disruption];
         }
         else {
           disruptions[entry.runID].push(entry.disruption);  // add to existing array
         }
       })

       /* done */
       let crowdData = {crowdedness: runCrowdedness, disruptions: disruptions}
       res.json({
           status: "success",
           stopID: stopID,
           ptvData: body,
           groupedDepts: groupByRouteDirectionID(body),
           crowdSourcedDisruptions: crowdData,
           routeGuide: null
       });
     })
     .catch(err => {
       console.log(err);  // TODO replace with Winston
       res.status(503).json({status: 'error'})
     })
    });
  }
}
