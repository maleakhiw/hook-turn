import { Component, OnInit } from '@angular/core';
// import { GongService } from './gong.service';
import { DeparturesService } from './departures.service'
import { DeparturesData, Stop } from './departures';

@Component({
  selector: 'my-app',
  templateUrl: './partials/app_component.html',
  providers: [ DeparturesService ]
})
export class AppComponent implements OnInit {
  departuresData: DeparturesData;
  stopData: Stop;
  stopName: string;
  stopNo: string;
  routes: any[];
  directions: any[];
  processedGroupedDepts: any;
  // name = "hello";
  // stopData = {'stop_name': 'Southern Cross Station'};

  constructor(private departuresService: DeparturesService) {}

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
    this.departuresService.getDeparturesData()
      .then(departuresData => this.updateDeparturesData(departuresData));  // when the Promise is resolved, add to local departuresData
  }

}
