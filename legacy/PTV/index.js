var express = require('express');
var app = express();
// var hmacsha1 = require('hmacsha1');
var request = require('request');

//http://stackoverflow.com/questions/7480158/how-do-i-use-node-js-crypto-to-create-a-hmac-sha1-hash
var crypto = require('crypto');

class PTV {
  constructor(dev_id, key) {
  	this.url = 'http://timetableapi.ptv.vic.gov.au';
    this.dev_id = dev_id;
    this.key = key;
  }

  stops(lat, long, callback) {

  	var url = this.url;  // base url for PTV API
  	var add = '/v3/stops/location/' + lat + ',' + long + '?devid=' + this.dev_id;  // build the URI


  	var signature = crypto.createHmac('sha1', this.key).update(add).digest('hex'); // get a HMAC-SHA1 signature for the URI
  	url += add;  // add URI to end of URL
    url += '&signature=' + signature; // add the signature to the end of the URL

 	  console.log(url);
  	request(url, callback);
  }

  departures(stopID, callback) {
    /*
    Model schema
    {
      "departures": [
        {
          "stop_id": 0,
          "route_id": 0,
          "run_id": 0,
          "direction_id": 0,
          "disruption_ids": [
            0
          ],
          "scheduled_departure_utc": "2017-04-25T04:49:31.729Z",
          "estimated_departure_utc": "2017-04-25T04:49:31.729Z",
          "at_platform": true,
          "platform_number": "string",
          "flags": "string"
        }
      ],
      "stops": {},
      "routes": {},
      "runs": {},
      "directions": {},
      "disruptions": {},
      "status": {
        "version": "string",
        "health": 0
      }
    }

    sample request url: http://timetableapi.ptv.vic.gov.au/v3/departures/route_type/1/stop/2504?max_results=3&include_cancelled=false&expand=all&devid=1000824&signature=24188F2D300CC228C16D2AE7133E520554678227


    */
    var url = this.url;
    var add = '/v3/departures/route_type/1/stop/' + stopID;
    add += '?max_results=3&include_cancelled=false&expand=all&devid=' + this.dev_id;

    var signature = crypto.createHmac('sha1', this.key).update(add).digest('hex');
    url += add;  // add URI to end of URL
    url += '&signature=' + signature; // add the signature to the end of the URL

    console.log(url);
    request(url, callback);

  }

}

var ptv = new PTV(1000824, 'c269558f-5915-11e6-a0ce-06f54b901f07');

app.get("/", function(req, res) {

  var callback = function(error, response, body) {
  	console.log(body);
    console.log(response.headers);

    if (response.headers['content-type'] == 'text/html') res.json({status: 'error'});
    if (body) res.send(body);
  }

  // console.log(req);
  if (req.query.latitude != null && req.query.longitude != null) {  // check if params set in GET request
    ptv.stops(req.query.latitude, req.query.longitude, callback);
  }
  else {
    res.send(
      {
        status: "error"
      }
    );
  }

  // ptv.stops(-37.8278185, 144.9666907, callback);
});


// GET request. params - stopid: int
app.get("/departures", function(req, res) {

  var callback = function(error, response, body) {
    if (response.headers['content-type'] == 'text/html') res.json({status: 'error'});
    if (body) {
      var toSend = {
        status: "success",
        stopID: stopID,
        departures: JSON.parse(body),
        crowdSourcedDisruptions: [],
        routeGuide: null
      }

      res.json(toSend);
    }
  }

  if (!req.query.stopid) {  // if stopID is not given by user
    res.json({status: 'error'});
  }
  else {
    var stopID = req.query.stopid;
    ptv.departures(stopID, callback); // sample stopID: 2504
  }
})

app.post("/report", function(req, res) {
	/* expected JSON:
	{
		type: "crowd" or "disruption",
		value: // 1, 2, 3, 4: empty, decent, full, overcrowded for crowding
    // timeReported: time
    // expiryTime: time
			   // description (string) for disruption
	}
	*/

	// put this inside the database. Do calculations here.
	// Better to do this in separate functions outside the app.post body.
	// Possibly put these fns in another PTV.js file and import it using "require" later.

	// send an updated response JSON, or just the new crowdLevel to the user (for crowding)
	// for disruption: either send back the same string (inefficient for long strings) or just an OK.
});

app.listen(3000, function(req, res) {
  console.log("App started");
});
