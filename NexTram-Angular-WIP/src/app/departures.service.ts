import { Injectable } from '@angular/core';

import { DeparturesData } from './departures';
import { DEPARTURESDATA } from './mock-departures';

@Injectable()
export class DeparturesService {
  getDeparturesData(): Promise<DeparturesData> {
    // console.log(DEPARTURESDATA);
    return Promise.resolve(DEPARTURESDATA);
  }
}
