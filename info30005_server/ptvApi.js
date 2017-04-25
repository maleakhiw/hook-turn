var request = require('request');
var crypto = require('crypto');

module.exports = class PTV {
  constructor(dev_id, key) {
  	this.url = 'http://timetableapi.ptv.vic.gov.au';
    this.dev_id = dev_id;
    this.key = key;
  }

  urlBuilder(add) {
    var signature = crypto.createHmac('sha1', this.key).update(add).digest('hex');
    return this.url + add + '&signature=' + signature;
  }

  stops(lat, long, callback) {
    // URI
  	var add = '/v3/stops/location/' + lat + ',' + long + '?devid=' + this.dev_id;
    var url = this.urlBuilder(add);
  	request(url, callback);
  }

  departures(stopID, callback) {
    var add = '/v3/departures/route_type/1/stop/' + stopID;
    add += '?max_results=3&include_cancelled=false&expand=all&devid=' + this.dev_id;
    var url = this.urlBuilder(add);
    console.log(url);
    request(url, callback);
  }
}

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
