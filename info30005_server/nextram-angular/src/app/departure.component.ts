import {Component, Input} from '@angular/core';

@Component({
  selector: 'departure',
  template: `
  <div class="upcoming-tram">
    <h1>{{ minsToNow(departure.estimated_departure_utc) }}</h1>
  </div>

  <p class="expected">Expected Crowd Level</p>
  <div class="progress">
    <div aria-valuemax="60" aria-valuemin="0" aria-valuenow="40" class="{{'progress-bar progress-bar-' + crowdedness[departure.run_id]?.class.toLowerCase()}}"
        role="progressbar" [ngStyle]="{width: calculateWidth(departure.run_id)}">
      {{crowdedness[departure.run_id]?.class}}
      {{departure.run_id}}
      <div *ngIf="!inCrowdedness(departure.run_id)">Data not available yet.</div>
    </div>
  </div>
  `
})
export class DepartureComponent {
  @Input() departure: any;  // departure data: parsedEstDeptTime
  @Input() routes: any; // list of routes, returned from PTV API
  @Input() directions: any; // list of directions, returned from PTV API
  @Input() crowdDisruptions: any;  // crowdsoured disruptions
  @Input() crowdedness: any;  // crowdsourced crowding data

  inCrowdedness(run_id: any) {
    // console.log(this.crowdedness);
    return (run_id in this.crowdedness);
  }

  /* formats the time string to a time from now */
  minsToNow(dateTimeString: string): string {
    var date = new Date(dateTimeString);
    var time = date.getTime() - new Date().getTime();
    var mins = Math.round(time/1000/60);  // milliseconds -> seconds -> minutes

    var ret = "in ";
    if (mins < 0) {
      ret = "Departed"
    }
    else if (mins == 0) {
      ret = "Now";
    }
    else if (mins == 1) {
      ret += mins + " min";
    }
    else if (mins < 60) {
      ret += mins + " mins";
    }
    else if (mins%60 == 1) {
      if (Math.round(mins/60) == 1) {
        ret += Math.round(mins/60) + " hour " + mins%60 + " min";
      } else {
        ret += Math.round(mins/60) + " hours " + mins%60 + " min";
      }
    }
    else {
      if (Math.round(mins/60) == 1) {
        ret += Math.round(mins/60) + " hour " + mins%60 + " mins";
      } else {
        ret += Math.round(mins/60) + " hours " + mins%60 + " mins";
      }
    }

    return ret;
  }

  calculateWidth(runId: any): string {
    if (this.crowdedness[runId]) {
      if (this.crowdedness[runId].class == "Empty") {  // fix for text inside progressbar not being seen if empty
        return '15%';
      }
      return this.crowdedness[runId].average/3*100 + '%';
    }


    else {
      return "0%";
    }
  }
}
