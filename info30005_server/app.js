/** Main file that will be run on the server
 * Author: HookTurns
 * Date: 21/04/2017
 * Version: 1.0
 */

/**********************************SETUP**************************************/
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require("path");
app.use(bodyParser.urlencoded({extended: true}));

// Database setup
var Database = require('./models/db.js');

// View setup
app.set("view engine", "ejs");
// Serve static files
app.use(express.static("assets"));

app.use('/nextramlive', express.static("nextram-angular/src/"));

// app.use(express.static("../NexTram-Angular-WIP"));
// app.use(express.static("NexTram-Angular-WIP"));

// PTV API request setup
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
                        crowdSourcedDisruptions: [result],
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

/*********************************H/T ROUTES**********************************/

// app.get("/reportdisruption", function(req, res) {

// })

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

// 404 Page Not Found
app.get("*", function(req, res) {
    res.render("index", {pageId: "404"});
});

/*********************************POST****************************************/

// Information gather from nextram page
app.post("/nextram", function(req, res) {
    var crowdedness = req.body.crowdedness;
    var userInput = {crowdednessLevel: crowdedness};
    Database.Crowdedness.create(userInput, function(err, object) {
        if (err) {
            console.log("Error");
        }
        else {
            console.log("Insertion success");
        }
    });

});



/**********************************LISTEN*************************************/
app.listen(3000, "localhost", function(req, res) {
  console.log("HookTurns server has started...")
});
