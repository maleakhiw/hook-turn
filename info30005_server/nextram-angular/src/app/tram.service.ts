import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/Rx";

@Injectable()
export class TramService {

	constructor(private http: Http) {}

	storeCrowdedness(data: any) {
		return this.http.post("http://localhost:3000/api/crowdednesses", data);
	}

	storeDisruption(data: any) {
		return this.http.post('http://localhost:3000/api/disruptions', data);
	}

}
