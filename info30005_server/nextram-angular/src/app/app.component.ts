import { Component, OnInit } from '@angular/core';
// import { GongService } from './gong.service';
import { TramService } from './tram.service';
import { DeparturesService } from './departures.service'
import { DeparturesData, Stop } from './departures';
import { Http, Response } from "@angular/http";

import { IntervalObservable } from 'rxjs/observable/IntervalObservable';


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

  // crowdsourced data
  crowdedness: any;
  crowdDisruptions: any;

  // Data needed for POST methods
  disruptionData: any = {}; // for disruption. Holds *all* entered text (data binding)
  lastSubmitted: any = []; // list of reported departures

  lastSubmitted_crowdedness: any = [];
  lastSubmitted_disruption: any = [];

  // show alerts
  showConnectionError: boolean = false;
  showSubmissionFailedError: boolean = false;


  containsObject(obj: any, list: any) {
    for (let i=0; i<list.length; i++) {
      if (list[i] === obj) {
        return true;
      }
    }
    return false;
  }

  containsObjectByRunId(obj: any, list: any) {
    for (let i=0; i<list.length; i++) {
      if (list[i].run_id === obj.run_id) {
        return true;
      }
    }
    return false;
  }

  // Method used for crowdedness post
  submitCrowdedness(departure: any, crowdedness: number) {
    console.log('onInputData, logging:', departure, crowdedness);

    var data = {
      stop_id: departure.stop_id,
      run_id: departure.run_id,
      crowdedness: crowdedness
    };

    this.tramService.storeDisruption(data)
      .subscribe((response) => {
                    console.log(response)
                    if (!this.containsObject(departure, this.lastSubmitted)) {
                      this.lastSubmitted.push(departure);
                      this.lastSubmitted_crowdedness.push(departure);
                    }
                  } ,
                  (error) => {
                    console.log(error);
                    this.showSubmissionFailedError = true;
                  });

    this.getDeparturesData(); // refresh data
  }

  submitDisruption(departure: any, disruption: any) {
    console.log('submitDisruption, logging:', departure, disruption);

    var data = {
      runID: departure.run_id,
      stopID: departure.stop_id,
      disruption: disruption
    }

    this.tramService.storeDisruption(data)
      .subscribe((response) => {
                    console.log(response)
                    if (!this.containsObject(departure, this.lastSubmitted)) {
                      this.lastSubmitted.push(departure);
                      this.lastSubmitted_disruption.push(departure);
                    }
                  } ,
                  (error) => {
                    console.log(error);
                    this.showSubmissionFailedError = true;
                  });

    // add to lastSubmitted array if it's not there yet
    this.getDeparturesData();
  }

  // Method used for styling the percentage
  calculateWidth(run_id: any) {
    // if user has already submit information
    if (this.crowdedness[run_id]) {
      var width = this.crowdedness[run_id].average / 3 * 100;
      console.log(width + "%");
      return (width + "%");
    }
    else {
      console.log("20%");
      return "0%";
    }
  }

  constructor(private departuresService: DeparturesService, private tramService: TramService, private http: Http) {}

  ngOnInit(): void {
    this.getDeparturesData();

    /* poll our server every minute */
    IntervalObservable.create(60 * 1000) // ms, 1 minute
        .subscribe(x => this.getDeparturesData());
  }

  updateDeparturesData(departuresData: any): void {
    console.log(departuresData);
    this.departuresData = departuresData;
    this.showConnectionError = false;

    // Get crowdsourced data
    this.crowdedness = departuresData.crowdSourcedDisruptions.crowdedness;
    this.crowdDisruptions = departuresData.crowdSourcedDisruptions.disruptions;

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

    console.log('lastSubmitted:', this.lastSubmitted);
    /* check if last submitted entry has disappeared from a group, and put it back if it has */
    if (this.lastSubmitted.length > 0) {
      for (let i=0; i<this.lastSubmitted.length; i++) {
        var key = this.lastSubmitted[i].route_id + '-' + this.lastSubmitted[i].direction_id;
        var group = departuresData.groupedDepts[key];
        if (group) {  // if a group exists
          // iterate over all entries in the group, find if we can find the same run_id there
          var isNotFound = true;
          for (let j=0; j<group.length; j++) {
            if (group[j].run_id == this.lastSubmitted[i].run_id) {
              isNotFound = false;
            }
          }

          if (isNotFound) { // add to the group if it does not exist there
            console.log("Added", this.lastSubmitted[i]);
            group.unshift(this.lastSubmitted[i]);  // add to beginning of array
          }
        }

        else {
          departuresData.groupedDepts[key] = this.lastSubmitted[i];  // add it back
        }
      }
    }

    /* sort groupedDepts */
    // add actual route numbers
    for (let key in departuresData.groupedDepts) {
      for (let i=0; i<departuresData.groupedDepts[key].length; i++) {
        departuresData.groupedDepts[key][i].route_no = departuresData.ptvData.routes[departuresData.groupedDepts[key][i].route_id].route_number;
      }
    }

    console.log(departuresData.groupedDepts);

    var ordered = {};
    Object.keys(departuresData.groupedDepts).sort(function(a, b) {
        return parseInt(departuresData.groupedDepts[a][0].route_no) - parseInt(departuresData.groupedDepts[b][0].route_no);
      }).forEach((key) => ordered[key] = departuresData.groupedDepts[key]);

    departuresData.groupedDepts = ordered;

    /* processed data */
    var processed = {};

    for (let key in departuresData.groupedDepts) {  // key: route_id + '-' + direction_id
      for (let i=0; i<departuresData.groupedDepts[key].length; i++) {
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
    // console.log(groupedBy2Departures);

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
      .then(departuresData => this.updateDeparturesData(departuresData))  // when the Promise is resolved, add to local departuresData
      .catch((reason) => this.showConnectionError = true);
  }

}
