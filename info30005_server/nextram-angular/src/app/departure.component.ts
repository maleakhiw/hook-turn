import {Component, Input} from '@angular/core';

@Component({
  selector: 'departure',
  template: `
  <div class="upcoming-tram">
    <h1>{{ minsToNow(departure.estimated_departure_utc) }}</h1>
  </div>

  <div class="progress">
    <div aria-valuemax="60" aria-valuemin="0" aria-valuenow="40" class="{{'progress-bar progress-bar-' + crowdSourcedDisruptions[departure.run_id]?.class.toLowerCase()}}"
        role="progressbar" [ngStyle]="{width: calculateWidth(departure.run_id)}">
      {{crowdSourcedDisruptions[departure.run_id]?.class}}
    </div>
  </div>
  `
})
export class DepartureComponent {
  @Input() departure: any;  // departure data: parsedEstDeptTime
  @Input() routes: any; // list of routes, returned from PTV API
  @Input() directions: any; // list of directions, returned from PTV API
  @Input() crowdSourcedDisruptions: any;  // crowdsoured disruptions

  /* formats the time string to a time from now */
  minsToNow(dateTimeString: string): string {
    var date = new Date(dateTimeString);
    var time = date.getTime() - new Date().getTime();
    console.log(date, new Date());
    console.log(time);
    if (date < new Date()) {
      return "Departed"
    }
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
    if (this.crowdSourcedDisruptions[runId]) {
      return this.crowdSourcedDisruptions[runId].average/3*100 + '%';
    } else {
      return "0%";
    }
  }
}
