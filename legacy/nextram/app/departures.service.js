"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var DeparturesService = (function () {
    function DeparturesService(http) {
        this.http = http;
        this.apiUrl = 'http://hookturns.info/departures';
    }
    DeparturesService.prototype.getDeparturesUrl = function (stopId) {
        console.log(this.apiUrl + '?stopid=' + stopId);
        return this.apiUrl + '?stopid=' + stopId;
    };
    DeparturesService.prototype.getDeparturesData = function (stopId) {
        // console.log(DEPARTURESDATA);
        // return Promise.resolve(DEPARTURESDATA);
        return this.http.get(this.getDeparturesUrl(stopId))
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    DeparturesService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return DeparturesService;
}());
DeparturesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], DeparturesService);
exports.DeparturesService = DeparturesService;
//# sourceMappingURL=departures.service.js.map