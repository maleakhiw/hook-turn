import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import "rxjs/Rx";

@Injectable()
export class TramService {

	constructor(private http: Http) {}
	
	// Method that will be used to store tram data
	storeTrams(data) {
		console.log(data);
		return this.http.post("/nextramdb", data);
	}

	// Method that will be used to get data from database
	getTrams(stop_id) {
		return this.http.get("/departures?stopid=" + stop_id)
	}
}