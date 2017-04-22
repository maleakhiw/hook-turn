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
  	var url = this.url;
  	var add = '/v3/stops/location/' + lat + ',' + long + '?devid=' + this.dev_id;
  	// var hash = hmacsha1(this.key, add);
  	var signature = crypto.createHmac('sha1', this.key).update(add).digest('hex');
  	url += add;
    url += '&signature=' + signature;

 	console.log(url);

 	var result;
  	request(url, callback);
  	return result
  }
}

app.get("/", function(req, res) {
  var ptv = new PTV(1000824, 'c269558f-5915-11e6-a0ce-06f54b901f07');
  
  var callback = function(error, response, body) {
  	console.log(body);
  	res.send(body);
  }

  ptv.stops(-37.8278185, 144.9666907, callback);
})

app.listen(3000, function(req, res) {
  console.log("App started");
});
