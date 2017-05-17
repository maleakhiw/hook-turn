import {Component, Input} from '@angular/core';
import {DepartureComponent} from './departure.component';

@Component({
  selector: 'smalldeparture',
  template: `
  <div class="upcoming-tram">
    <h3>{{ minsToNow(departure.estimated_departure_utc) }}</h3>
  </div>

  <div class="progress">
    <div aria-valuemax="60" aria-valuemin="0" aria-valuenow="40" class="{{'progress-bar progress-bar-' + crowding[departure.run_id]?.class.toLowerCase()}}"
        role="progressbar" [ngStyle]="{width: calculateWidth(departure.run_id)}">
      {{crowding[departure.run_id]?.class}}
    </div>
  </div>
  `
})
export class SmallDepartureComponent extends DepartureComponent {
}
