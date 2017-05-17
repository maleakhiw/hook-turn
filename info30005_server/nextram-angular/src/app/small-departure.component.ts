import {Component, Input} from '@angular/core';
import {DepartureComponent} from './departure.component';

@Component({
  selector: 'smalldeparture',
  template: `
  <div class="upcoming-tram">
    <h3>{{ minsToNow(departure.estimated_departure_utc) }}</h3>
  </div>

  <div class="progress">
    <div aria-valuemax="60" aria-valuemin="0" aria-valuenow="40" class="{{'progress-bar progress-bar-' + crowdedness[departure.run_id]?.class.toLowerCase()}}"
        role="progressbar" [ngStyle]="{width: calculateWidth(departure.run_id)}">
      {{crowdedness[departure.run_id]?.class}}
      <div *ngIf="!inCrowdedness(departure.run_id)">Data not available yet.</div>
    </div>
  </div>
  `
})
export class SmallDepartureComponent extends DepartureComponent {
}
