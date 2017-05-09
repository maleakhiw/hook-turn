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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
// import { GongService } from './gong.service';
var tram_service_1 = require("./tram.service");
var departures_service_1 = require("./departures.service");
var http_1 = require("@angular/http");
var IntervalObservable_1 = require("rxjs/observable/IntervalObservable");
var jumbotronImages = ['http://i.imgur.com/52bc7MI.jpg', 'http://i.imgur.com/sqOw10k.jpg', 'http://i.imgur.com/4KYxeCV.jpg', 'http://i.imgur.com/8zk1Odl.jpg', 'http://i.imgur.com/QUAlma0.jpg', 'http://i.imgur.com/Dflx2c0.jpg', 'http://i.imgur.com/oZxFHmC.jpg', 'http://i.imgur.com/I6yatSR.jpg', 'http://i.imgur.com/1n2udYH.jpg', 'http://i.imgur.com/SmZqStQ.jpg', 'http://i.imgur.com/qhUgfXJ.jpg', 'http://i.imgur.com/mIMKH0x.jpg', 'http://i.imgur.com/jDGsOEm.jpg', 'http://i.imgur.com/RVzgIkR.jpg', 'http://i.imgur.com/BILgjuf.jpg', 'http://i.imgur.com/0Rarcvi.jpg', 'http://i.imgur.com/7oCRYB3.jpg', 'http://i.imgur.com/vfUlNwL.jpg', 'http://i.imgur.com/K4czJdd.jpg', 'http://i.imgur.com/n9ormd8.jpg', 'http://i.imgur.com/R0OWtPD.jpg'];
var getRandomImageURL = function () {
    var randomNo = Math.floor(Math.random() * jumbotronImages.length);
    return jumbotronImages[randomNo];
};
var AppComponent = (function () {
    function AppComponent(departuresService, tramService, http) {
        this.departuresService = departuresService;
        this.tramService = tramService;
        this.http = http;
        // Data needed for post
        this.data = {};
    }
    // Method used for crowdedness post
    AppComponent.prototype.onInputData = function (departure, crowdedness) {
        console.log(departure);
        this.lastSubmitted = departure;
        this.data.stop_id = departure.stop_id;
        this.data.run_id = departure.run_id;
        this.data.crowdedness = crowdedness;
    };
    AppComponent.prototype.onSubmitCrowdedness = function () {
        this.tramService.storeTrams(this.data).subscribe(function (response) { return console.log(response); }, function (error) { return console.log(error); });
        this.getDeparturesData();
    };
    // Method used for styling the percentage
    AppComponent.prototype.calculateWidth = function (run_id) {
        // if user has already submit information
        if (this.crowdSourcedDisruptions[run_id]) {
            var width = this.crowdSourcedDisruptions[run_id].average / 3 * 100;
            console.log(width + "%");
            return (width + "%");
        }
        else {
            console.log("20%");
            return "0%";
        }
    };
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getDeparturesData();
        IntervalObservable_1.IntervalObservable.create(10 * 1000) // ms
            .subscribe(function (x) { return _this.getDeparturesData(); });
    };
    // TODO: one single function imported
    AppComponent.prototype.minsToNow = function (dateTimeString) {
        var date = new Date(dateTimeString);
        var time = date.getTime() - new Date().getTime();
        console.log(date, new Date());
        console.log(time);
        if (date < new Date()) {
            return "Departed";
        }
        var mins = Math.round(time / 1000 / 60); // milliseconds -> seconds -> minutes
        var ret = "in ";
        if (mins < 0) {
            ret = "Departed";
        }
        else if (mins == 0) {
            ret = "Now";
        }
        else if (mins == 1) {
            ret += mins + " min";
        }
        else if (mins < 60) {
            ret += mins + " mins";
        }
        else if (mins % 60 == 1) {
            if (Math.round(mins / 60) == 1) {
                ret += Math.round(mins / 60) + " hour " + mins % 60 + " min";
            }
            else {
                ret += Math.round(mins / 60) + " hours " + mins % 60 + " min";
            }
        }
        else {
            if (Math.round(mins / 60) == 1) {
                ret += Math.round(mins / 60) + " hour " + mins % 60 + " mins";
            }
            else {
                ret += Math.round(mins / 60) + " hours " + mins % 60 + " mins";
            }
        }
        return ret;
    };
    AppComponent.prototype.updateDeparturesData = function (departuresData) {
        console.log(departuresData);
        this.departuresData = departuresData;
        // Get crowdsourced data
        this.crowdSourcedDisruptions = departuresData.crowdSourcedDisruptions;
        console.log(this.crowdSourcedDisruptions);
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
        /* check if last submitted entry has disappeared from a group, and put it back if it has */
        if (this.lastSubmitted) {
            var key = this.lastSubmitted.route_id + '-' + this.lastSubmitted.direction_id;
            var group = departuresData.groupedDepts[key];
            if (group) {
                // iterate over all entries in the group, find if we can find the same run_id there
                var isNotFound = true;
                for (var i_1 = 0; i_1 < group.length; i_1++) {
                    if (group[i_1].run_id == this.lastSubmitted.run_id) {
                        isNotFound = false;
                    }
                }
                if (isNotFound) {
                    console.log("Added", this.lastSubmitted);
                    group.unshift(this.lastSubmitted); // add to beginning of array
                }
            }
            else {
                departuresData.groupedDepts[key] = this.lastSubmitted; // add it back
            }
        }
        /* sort groupedDepts */
        // add actual route numbers
        for (var key_1 in departuresData.groupedDepts) {
            for (var i_2 = 0; i_2 < departuresData.groupedDepts[key_1].length; i_2++) {
                departuresData.groupedDepts[key_1][i_2].route_no = departuresData.ptvData.routes[departuresData.groupedDepts[key_1][i_2].route_id].route_number;
            }
        }
        console.log(departuresData.groupedDepts);
        var ordered = {};
        Object.keys(departuresData.groupedDepts).sort(function (a, b) {
            return parseInt(departuresData.groupedDepts[a][0].route_no) - parseInt(departuresData.groupedDepts[b][0].route_no);
        }).forEach(function (key) { return ordered[key] = departuresData.groupedDepts[key]; });
        departuresData.groupedDepts = ordered;
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
        // console.log(groupedBy2Departures);
        this.routes = departuresData.ptvData.routes;
        this.directions = departuresData.ptvData.directions;
    };
    AppComponent.prototype.getDeparturesData = function () {
        var _this = this;
        // http://stackoverflow.com/questions/5448545/how-to-retrieve-get-parameters-from-javascript
        var Params = (function () {
            function Params() {
            }
            return Params;
        }());
        var queryDict = new Params();
        window.location.search.substr(1).split("&").forEach(function (item) { queryDict[item.split("=")[0]] = item.split("=")[1]; });
        // TODO: Angular2 routing, validation
        this.departuresService.getDeparturesData(queryDict.stop_id)
            .then(function (departuresData) { return _this.updateDeparturesData(departuresData); }); // when the Promise is resolved, add to local departuresData
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './partials/app_component.html',
        providers: [departures_service_1.DeparturesService, tram_service_1.TramService],
        styles: ['.jumbotron { background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("' + getRandomImageURL() + '"); }']
    }),
    __metadata("design:paramtypes", [departures_service_1.DeparturesService, tram_service_1.TramService, http_1.Http])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map