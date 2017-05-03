/** Main file that will be run on the server
 * Author: HookTurns
 * Date: 21/04/2017
 * Version: 1.0
 */

/**********************************SETUP**************************************/
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors'); // cross-origin
var path = require("path");
app.use(bodyParser.urlencoded({extended: true}));

var Database = require('./models/db.js');
app.set("view engine", "ejs");

/* static files */
app.use(express.static("assets"));
app.use('/nextramlive', express.static("nextram-angular/src/"));

/* PTV, trams */
var PTV = require('./ptvApi.js');
var ptv = new PTV(1000824, 'c269558f-5915-11e6-a0ce-06f54b901f07');
var tramData = require("./assets/json/tramstops.json");

/***********************************PTV ROUTES********************************/

var groupByRouteDirectionID = function(ptvData) {
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

// GET request. params - stopid: int
app.get("/departures", cors(), function(req, res) {
    var callback = function(error, response, body) {
        // Check status and error reporting before processing JSON
        if (!error && response.statusCode == 200) {
            // Check validity (only process JSON files, does not want website request)
            if (response.headers['content-type'] == 'text/html') res.json({status: 'error'});

            // Get Crowdedness from database
            Database.Crowdedness.find({}, function(err, result) {
                console.log(err);
                console.log(result);
                // Send back the result in json format
                if (body) {
                    var toSend = {
                        status: "success",
                        stopID: stopID,
                        ptvData: JSON.parse(body),
                        groupedDepts: groupByRouteDirectionID(JSON.parse(body)),
                        crowdSourcedDisruptions: result,
                        routeGuide: null
                    }
                    res.json(toSend);
                }
            });
        }
    }

    // Give an error if user does not put stopId as query parameter
    if (!req.query.stopid) {
       res.json({status: 'error'});
    }
    else {
       var stopID = req.query.stopid;
       ptv.departures(stopID, callback); // sample stopID: 2504
    }
});

/***********************************DISRUPTION********************************/

var mongoose = require('mongoose');
var Disruption = mongoose.model('Disruption');

// Create new disruption
app.post('/reportdisruption', function(req, res) {
  var disruption = new Disruption({
    "status": req.body.status,
    "runID": req.body.runID,
    "stopID": req.body.stopID,
    "crowdSourcedDisruptions": req.body.crowdSourcedDisruptions
  });

  disruption.save(function(err,newDisruption ){
      if(!err){
          res.send(newDisruption);
      }else{
          res.sendStatus(400);
      }
  });
});

// Find all disruptions
app.get('/reportdisruption', function(req,res) {
    Disruption.find(function(err,disruptions){
        if(!err){
            res.send(disruptions);
        }else{
            res.sendStatus(404);
        }
    });
});

// Find one disruption by id
app.get('/reportdisruption/:id', function(req,res){
    var disruptionInx = req.params.id;
    Disruption.findById(disruptionInx,function(err,disruption){
        if(!err){
            res.send(disruption);
        }else{
            res.sendStatus(404);
        }
    });
});

// Find one disruption and update by id
app.post('/reportdisruption/:id', function(req,res) {
    var disruptionInx = req.params.id;
    Disruption.findByIdAndUpdate(disruptionInx,
      {
        $push:
        {
          "crowdSourcedDisruptions": req.body.crowdSourcedDisruptions
        }
      },
      {safe: true, upsert: true},
      function(err,disruption){
        if(!err){
            ////////////
            res.send(disruption);
        }else{
            res.sendStatus(404);
        }
    });
});

// Delete one disruption by id
app.delete('/reportdisruption/:id', function(req,res){
    var disruptionInx = req.params.id;
    Disruption.findByIdAndRemove(disruptionInx,function(err,disruption){
        if(!err){
            res.send(disruption);
        }else{
            res.sendStatus(404);
        }
    });
});

/******************************SUPPORTING JSONS*******************************/
// NexTram Picture Assets
// app.get("/"){

// }



/***********************************ROUTES************************************/
// Home
app.get("/", function(req, res) {
    res.render("index", {pageId: "home"});
});

// About
app.get("/about", function(req, res) {
    res.render("index", {pageId: "about"});
});

// How It Works
app.get("/how-it-works", function(req, res) {
    res.render("index", {pageId: "hiw"});
});

// Search
app.get("/search", function(req, res) {
    res.render("index", {pageId: "search"});
});

// Nextram
app.get("/nextram", function(req, res) {
    // Process query if user has given stop name on search bar
    if (req.query.search) {
        var stop_name = req.query.search;
        var stop_id;
        // Find appropriate stop id
        for (var i = 0; i < tramData["stops"].length; i++) {
            if (tramData["stops"][i]["stop_name"].includes(stop_name)) {
                stop_id = tramData["stops"][i]["stop_id"];
                break;
            }
        }
        res.redirect("/nextram?stop_id=" + stop_id);
    }
    else {
       res.sendfile("nextram-angular/src/index.html")
    }
});


// Route Guide
app.get("/route-guide", function(req, res) {
    res.render("index", {pageId: "route_guide"});
});

/*********************************POST****************************************/

// Information gather from nextram page
app.post("/nextram", function(req, res) {
    var crowdedness = req.body.crowdedness;
    var runId = req.body.direction_id;
    var stopId = req.body.route_id;
    var userInput = {"runID": runId, "stopID": stopId, "crowdednessLevel": crowdedness};
    Database.Crowdedness.create(userInput, function(err, object) {
        if (err) {
            console.log("Error");
        }
        else {
            console.log("Insertion success" + object);
            res.json({"status": "success"});
        }
    });
});


/**********************************LISTEN*************************************/
// 404 Page Not Found
app.get("*", function(req, res) {
    res.render("index", {pageId: "404"});
});

app.listen(3000, "localhost", function(req, res) {
  console.log("HookTurns server has started...")
});
