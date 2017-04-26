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
  // name = "hello";
  // stopData = {'stop_name': 'Southern Cross Station'};

  constructor(private departuresService: DeparturesService) {}

  ngOnInit(): void {
    this.getDeparturesData();
  }

  updateDeparturesData(departuresData: any): void {
    console.log(departuresData);
    this.departuresData = departuresData;
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
        console.log(stopName);
        this.stopName = stopName;
      }
    }

    this.routes = departuresData.ptvData.routes;

    this.directions = departuresData.ptvData.directions;
  }

  getDeparturesData(): void { // TODO: change to Observables using RxJS
    this.departuresService.getDeparturesData()
      .then(departuresData => this.updateDeparturesData(departuresData));  // when the Promise is resolved, add to local departuresData
  }

}
