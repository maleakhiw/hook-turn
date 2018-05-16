import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { DeparturesData } from './departures';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class DeparturesService {
  apiUrl = 'http://localhost:3000/api/departures'

  constructor(private http: Http) {}

  getDeparturesUrl(stopId: string): string {
    console.log(this.apiUrl + '?stopid=' +  stopId);
    return this.apiUrl + '?stopid=' +  stopId;
  }

  getDeparturesData(stopId: any): Promise<DeparturesData> {
    return this.http.get(this.getDeparturesUrl(stopId))
      .toPromise()
      .then(response => response.json() as DeparturesData)
      .catch(this.handleError);
  }

  handleError(error: any): Promise<any> {
    console.error('An error occurred', error);  // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
