import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/Rx";

@Injectable()
export class TramService {

	constructor(private http: Http) {}

	// Method that will be used to store tram data
	storeCrowdedness(data: any) {
		return this.http.post("/nextramdb", data);
	}

	storeDisruption(data: any) {
		return this.http.post('/reportdisruption', data);
	}

}
