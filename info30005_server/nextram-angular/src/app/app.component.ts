import { Component, OnInit } from '@angular/core';
// import { GongService } from './gong.service';
import { TramService } from './tram.service';
import { DeparturesService } from './departures.service'
import { DeparturesData, Stop } from './departures';


var jumbotronImages = ['http://i.imgur.com/52bc7MI.jpg', 'http://i.imgur.com/sqOw10k.jpg', 'http://i.imgur.com/4KYxeCV.jpg', 'http://i.imgur.com/8zk1Odl.jpg', 'http://i.imgur.com/QUAlma0.jpg', 'http://i.imgur.com/Dflx2c0.jpg', 'http://i.imgur.com/oZxFHmC.jpg', 'http://i.imgur.com/I6yatSR.jpg', 'http://i.imgur.com/1n2udYH.jpg', 'http://i.imgur.com/SmZqStQ.jpg', 'http://i.imgur.com/qhUgfXJ.jpg', 'http://i.imgur.com/mIMKH0x.jpg', 'http://i.imgur.com/jDGsOEm.jpg', 'http://i.imgur.com/RVzgIkR.jpg', 'http://i.imgur.com/BILgjuf.jpg', 'http://i.imgur.com/0Rarcvi.jpg', 'http://i.imgur.com/7oCRYB3.jpg', 'http://i.imgur.com/vfUlNwL.jpg', 'http://i.imgur.com/K4czJdd.jpg', 'http://i.imgur.com/n9ormd8.jpg', 'http://i.imgur.com/R0OWtPD.jpg'];

var getRandomImageURL = function(): string {
    var randomNo = Math.floor(Math.random()*jumbotronImages.length);
    return jumbotronImages[randomNo];
}

@Component({
  selector: 'my-app',
  templateUrl: './partials/app_component.html',
  providers: [ DeparturesService, TramService ],
  styles: ['.jumbotron { background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("' + getRandomImageURL() + '"); }']
})
export class AppComponent implements OnInit {
  departuresData: DeparturesData;
  stopData: Stop;
  stopName: string;
  stopNo: string;
  routes: any[];
  directions: any[];
  processedGroupedDepts: any;

  // Data needed for post
  data = {};

  // Method used for crowdedness post
  onInputData(stop_id, run_id, crowdedness) {
    this.data.stop_id = stop_id;
    this.data.run_id = run_id;
    this.data.crowdedness = crowdedness;
  }
  onSubmitCrowdedness() {
    this.tramService.storeTrams(this.data).subscribe((response) => console.log(response), (error) => console.log(error));
  }

  constructor(private departuresService: DeparturesService, private tramService: TramService) {}

  ngOnInit(): void {
    this.getDeparturesData();
  }

  // TODO: assumes waiting time only up to 1h
  getMinutesToNow(date: Date): number {
    // return 1;
    var time = date.getTime() - new Date().getTime();
    return Math.round(time/1000/60);  // milliseconds -> seconds -> minutes
  }

  updateDeparturesData(departuresData: any): void {
    console.log(departuresData);
    this.departuresData = departuresData;

    /* get stop name and no for jumbotron, load to attribs */
    for (var key in departuresData.ptvData.stops) { // assume only 1 stop
      this.stopData = departuresData.ptvData.stops[key];
      var stopName = this.stopData.stop_name;
      var re = '\\d+$';
      var matches = stopName.match(re);
      if (matches) {
        var match = matches[0];
        this.stopNo = match;
        this.stopName = stopName.slice(0, stopName.length - match.length - 1);
      }
      else {
        this.stopName = stopName;
      }
    }

    /* processed data */
    var processed = {};

    for (var key in departuresData.groupedDepts) {  // key: route_id + '-' + direction_id
      for (var i=0; i<departuresData.groupedDepts[key].length; i++) {
        if (departuresData.groupedDepts[key][i].estimated_departure_utc) {  // if estimated_departure_utc is null, not upcoming tram
          /* parse departure time */
          var departure = departuresData.groupedDepts[key][i];
          departure.parsedEstDeptTime = new Date(departuresData.groupedDepts[key][i].estimated_departure_utc);

          /* add to new processed JSON */
          if (key in processed) {
            processed[key].push(departure);
          }
          else {
            processed[key] = [departure];
          }
        }
      }
    }

    var i = 0;
    var tmp = [];
    var groupedBy2Departures = [];
    for (var key in processed) {
      tmp.push(processed[key]);
      if (tmp.length%2==0 || i==Object.keys(processed).length-1)  { // "break" if 2 entries filled up, or last entry
        groupedBy2Departures.push(tmp);
        tmp = [];
      }
      i++;
    }

    this.processedGroupedDepts = groupedBy2Departures;
    console.log(groupedBy2Departures);

    this.routes = departuresData.ptvData.routes;

    this.directions = departuresData.ptvData.directions;
  }

  getDeparturesData(): void { // TODO: change to Observables using RxJS
    // http://stackoverflow.com/questions/5448545/how-to-retrieve-get-parameters-from-javascript

    class Params {
      stop_id: any;
    }

    var queryDict = new Params();
    window.location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]});
    // TODO: Angular2 routing, validation

    this.departuresService.getDeparturesData(queryDict.stop_id)
      .then(departuresData => this.updateDeparturesData(departuresData));  // when the Promise is resolved, add to local departuresData
  }

}
