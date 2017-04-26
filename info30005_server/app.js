/** Main file that will be run on the server
 * Author: HookTurns
 * Date: 21/04/2017
 * Version: 1.0
 */

/**********************************SETUP**************************************/
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

// Database setup
require('./models/db.js');

// Routes setup
// var routes = require('./routes/routes.js');
// app.use('/',routes);

// View setup
app.set("view engine", "ejs");
// Serve static files
app.use(express.static("assets"));

// PTV API request setup
var PTV = require('./ptvApi.js');
var ptv = new PTV(1000824, 'c269558f-5915-11e6-a0ce-06f54b901f07');

/***********************************PTV ROUTES********************************/

// GET request. params - stopid: int
app.get("/departures", function(req, res) {

    var callback = function(error, response, body) {
        // Check status and error reporting before processing JSON
        if (!error && response.statusCode == 200) {
            // Check validity (only process JSON files, does not want website request)
            if (response.headers['content-type'] == 'text/html') res.json({status: 'error'});


            if (body) {
                var toSend = {
                    status: "success",
                    stopID: stopID,
                    departures: JSON.parse(body).departures,
                    crowdSourcedDisruptions: [],
                    routeGuide: null
                };

                res.json(toSend);
            }
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
	res.render("index", {pageId: "nextram"});
});

// Route Guide
app.get("/route-guide", function(req, res) {
	res.render("index", {pageId: "route_guide"});
});

// 404 Page Not Found
app.get("*", function(req, res) {
	res.render("index", {pageId: "404"});
});

/**********************************LISTEN*************************************/
app.listen(3000, "localhost", function(req, res) {
  console.log("HookTurns server has started...")
});
