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
var jumbotronImages = ['http://i.imgur.com/52bc7MI.jpg', 'http://i.imgur.com/sqOw10k.jpg', 'http://i.imgur.com/4KYxeCV.jpg', 'http://i.imgur.com/8zk1Odl.jpg', 'http://i.imgur.com/QUAlma0.jpg', 'http://i.imgur.com/Dflx2c0.jpg', 'http://i.imgur.com/oZxFHmC.jpg', 'http://i.imgur.com/I6yatSR.jpg', 'http://i.imgur.com/1n2udYH.jpg', 'http://i.imgur.com/SmZqStQ.jpg', 'http://i.imgur.com/qhUgfXJ.jpg', 'http://i.imgur.com/mIMKH0x.jpg', 'http://i.imgur.com/jDGsOEm.jpg', 'http://i.imgur.com/RVzgIkR.jpg', 'http://i.imgur.com/BILgjuf.jpg', 'http://i.imgur.com/0Rarcvi.jpg', 'http://i.imgur.com/7oCRYB3.jpg', 'http://i.imgur.com/vfUlNwL.jpg', 'http://i.imgur.com/K4czJdd.jpg', 'http://i.imgur.com/n9ormd8.jpg', 'http://i.imgur.com/R0OWtPD.jpg'];
var getRandomImageURL = function () {
    var randomNo = Math.floor(Math.random() * jumbotronImages.length);
    return jumbotronImages[randomNo];
};
var AppComponent = (function () {
    // name = "hello";
    // stopData = {'stop_name': 'Southern Cross Station'};
    function AppComponent(departuresService) {
        this.departuresService = departuresService;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.getDeparturesData();
    };
    // TODO: assumes waiting time only up to 1h
    AppComponent.prototype.getMinutesToNow = function (date) {
        // return 1;
        var time = date.getTime() - new Date().getTime();
        return Math.round(time / 1000 / 60); // milliseconds -> seconds -> minutes
    };
    AppComponent.prototype.updateDeparturesData = function (departuresData) {
        console.log(departuresData);
        this.departuresData = departuresData;
        /* get stop name and no for jumbotron, load to attribs */
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
                this.stopName = stopName;
            }
        }
        /* processed data */
        var processed = {};
        for (var key in departuresData.groupedDepts) {
            for (var i = 0; i < departuresData.groupedDepts[key].length; i++) {
                if (departuresData.groupedDepts[key][i].estimated_departure_utc) {
                    /* parse departure time */
                    var departure = departuresData.groupedDepts[key][i];
                    departure.parsedEstDeptTime = new Date(departuresData.groupedDepts[key][i].estimated_departure_utc);
                    /* add to new processed JSON */
                    if (key in processed) {
                        processed[key].push(departure);
                    }
                    else {
                        processed[key] = [departure];
                    }
                }
            }
        }
        var i = 0;
        var tmp = [];
        var groupedBy2Departures = [];
        for (var key in processed) {
            tmp.push(processed[key]);
            if (tmp.length % 2 == 0 || i == Object.keys(processed).length - 1) {
                groupedBy2Departures.push(tmp);
                tmp = [];
            }
            i++;
        }
        this.processedGroupedDepts = groupedBy2Departures;
        console.log(groupedBy2Departures);
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
        providers: [departures_service_1.DeparturesService],
        styles: ['.jumbotron { background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("' + getRandomImageURL() + '"); }']
    }),
    __metadata("design:paramtypes", [departures_service_1.DeparturesService])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map