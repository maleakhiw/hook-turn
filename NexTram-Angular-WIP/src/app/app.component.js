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
// import { GongService } from './gong.service';
var departures_service_1 = require("./departures.service");
var AppComponent = (function () {
    // name = "hello";
    // stopData = {'stop_name': 'Southern Cross Station'};
    function AppComponent(departuresService) {
        this.departuresService = departuresService;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.getDeparturesData();
    };
    AppComponent.prototype.updateDeparturesData = function (departuresData) {
        this.departuresData = departuresData;
        for (var key in departuresData.ptvData.stops) {
            this.stopData = departuresData.ptvData.stops[key];
            var stopName = this.stopData.stop_name;
            var re = '\\d+$';
            var matches = stopName.match(re);
            if (matches) {
                var match = matches[0];
                this.stopNo = match;
                this.stopName = stopName.slice(0, stopName.length - match.length - 1);
            }
            else {
                console.log(stopName);
                this.stopName = stopName;
            }
        }
        this.routes = departuresData.ptvData.routes;
        this.directions = departuresData.ptvData.directions;
    };
    AppComponent.prototype.getDeparturesData = function () {
        var _this = this;
        this.departuresService.getDeparturesData()
            .then(function (departuresData) { return _this.updateDeparturesData(departuresData); }); // when the Promise is resolved, add to local departuresData
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './partials/app_component.html',
        providers: [departures_service_1.DeparturesService]
    }),
    __metadata("design:paramtypes", [departures_service_1.DeparturesService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map