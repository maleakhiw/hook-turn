webpackJsonp([1,4],{

/***/ 117:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(18);
var DepartureComponent = (function () {
    function DepartureComponent() {
    }
    /* formats the time string to a time from now */
    DepartureComponent.prototype.minsToNow = function (dateTimeString) {
        var date = new Date(dateTimeString);
        var time = date.getTime() - new Date().getTime();
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
    DepartureComponent.prototype.calculateWidth = function (runId) {
        if (this.crowdSourcedDisruptions[runId]) {
            return this.crowdSourcedDisruptions[runId].average / 3 * 100 + '%';
        }
        else {
            return "0%";
        }
    };
    return DepartureComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DepartureComponent.prototype, "departure", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DepartureComponent.prototype, "routes", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DepartureComponent.prototype, "directions", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DepartureComponent.prototype, "crowdSourcedDisruptions", void 0);
DepartureComponent = __decorate([
    core_1.Component({
        selector: 'departure',
        template: "\n  <div class=\"upcoming-tram\">\n    <h1>{{ minsToNow(departure.estimated_departure_utc) }}</h1>\n  </div>\n\n  <div class=\"progress\">\n    <div aria-valuemax=\"60\" aria-valuemin=\"0\" aria-valuenow=\"40\" class=\"{{'progress-bar progress-bar-' + crowdSourcedDisruptions[departure.run_id]?.class.toLowerCase()}}\"\n        role=\"progressbar\" [ngStyle]=\"{width: calculateWidth(departure.run_id)}\">\n      {{crowdSourcedDisruptions[departure.run_id]?.class}}\n    </div>\n  </div>\n  "
    })
], DepartureComponent);
exports.DepartureComponent = DepartureComponent;
//# sourceMappingURL=departure.component.js.map

/***/ }),

/***/ 183:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 183;


/***/ }),

/***/ 184:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = __webpack_require__(188);
var core_1 = __webpack_require__(18);
var app_module_1 = __webpack_require__(190);
core_1.enableProdMode();
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 189:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(18);
// import { GongService } from './gong.service';
var tram_service_1 = __webpack_require__(195);
var departures_service_1 = __webpack_require__(191);
var http_1 = __webpack_require__(66);
var IntervalObservable_1 = __webpack_require__(155);
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
        // Data needed for POST methods
        this.data = {}; // for crowding. Keys: stop_id, run_id, crowdedness
        this.disruptionData = {}; // for disruption. Holds *all* entered text for now
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
        this.tramService.storeTrams(this.data).
            subscribe(function (response) { return console.log(response); }, function (error) { return console.log(error); });
        this.getDeparturesData();
    };
    AppComponent.prototype.onSubmitDisruption = function (departure, disruption) {
        console.log('onSubmitDisruption');
        console.log(departure);
        console.log(disruption);
        var data = {};
        data['runID'] = departure.run_id;
        data['stopID'] = departure.stop_id;
        data['disruption'] = disruption;
        console.log(data);
        this.tramService.storeDisruption(data)
            .subscribe(function (response) { return console.log(response); }, function (error) { return console.log(error); });
        this.lastSubmittedDisruption = departure;
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
        IntervalObservable_1.IntervalObservable.create(60 * 1000) // ms, 1 minute
            .subscribe(function (x) { return _this.getDeparturesData(); });
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
        template: __webpack_require__(350),
        providers: [departures_service_1.DeparturesService, tram_service_1.TramService],
        styles: ['.jumbotron { background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("' + getRandomImageURL() + '"); }']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof departures_service_1.DeparturesService !== "undefined" && departures_service_1.DeparturesService) === "function" && _a || Object, typeof (_b = typeof tram_service_1.TramService !== "undefined" && tram_service_1.TramService) === "function" && _b || Object, typeof (_c = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _c || Object])
], AppComponent);
exports.AppComponent = AppComponent;
var _a, _b, _c;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 190:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(18);
var platform_browser_1 = __webpack_require__(87);
var http_1 = __webpack_require__(66);
var app_component_1 = __webpack_require__(189);
var departure_component_1 = __webpack_require__(117);
var small_departure_component_1 = __webpack_require__(194);
var navbar_component_1 = __webpack_require__(193);
var keys_pipe_1 = __webpack_require__(192);
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule],
        declarations: [app_component_1.AppComponent,
            departure_component_1.DepartureComponent, small_departure_component_1.SmallDepartureComponent,
            navbar_component_1.NavbarComponent, keys_pipe_1.KeysPipe],
        bootstrap: [app_component_1.AppComponent],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 191:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(18);
var http_1 = __webpack_require__(66);
__webpack_require__(152);
var DeparturesService = (function () {
    function DeparturesService(http) {
        this.http = http;
        // apiUrl = 'http://hookturns.info/departures';
        this.apiUrl = 'http://104.199.124.40/departures';
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
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], DeparturesService);
exports.DeparturesService = DeparturesService;
var _a;
//# sourceMappingURL=departures.service.js.map

/***/ }),

/***/ 192:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(18);
var KeysPipe = (function () {
    function KeysPipe() {
    }
    KeysPipe.prototype.transform = function (value, args) {
        var keys = [];
        for (var key in value) {
            keys.push(key);
        }
        return keys;
    };
    return KeysPipe;
}());
KeysPipe = __decorate([
    core_1.Pipe({ name: 'keys' })
], KeysPipe);
exports.KeysPipe = KeysPipe;
//# sourceMappingURL=keys.pipe.js.map

/***/ }),

/***/ 193:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(18);
var NavbarComponent = (function () {
    function NavbarComponent() {
    }
    return NavbarComponent;
}());
NavbarComponent = __decorate([
    core_1.Component({
        selector: 'navbar',
        template: __webpack_require__(351)
    })
], NavbarComponent);
exports.NavbarComponent = NavbarComponent;
//# sourceMappingURL=navbar.component.js.map

/***/ }),

/***/ 194:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __webpack_require__(18);
var departure_component_1 = __webpack_require__(117);
var SmallDepartureComponent = (function (_super) {
    __extends(SmallDepartureComponent, _super);
    function SmallDepartureComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SmallDepartureComponent;
}(departure_component_1.DepartureComponent));
SmallDepartureComponent = __decorate([
    core_1.Component({
        selector: 'smalldeparture',
        template: "\n  <div class=\"upcoming-tram\">\n    <h3>{{ minsToNow(departure.estimated_departure_utc) }}</h3>\n  </div>\n\n  <div class=\"progress\">\n    <div aria-valuemax=\"60\" aria-valuemin=\"0\" aria-valuenow=\"40\" class=\"{{'progress-bar progress-bar-' + crowdSourcedDisruptions[departure.run_id]?.class.toLowerCase()}}\"\n        role=\"progressbar\" [ngStyle]=\"{width: calculateWidth(departure.run_id)}\">\n      {{crowdSourcedDisruptions[departure.run_id]?.class}}\n    </div>\n  </div>\n  "
    })
], SmallDepartureComponent);
exports.SmallDepartureComponent = SmallDepartureComponent;
//# sourceMappingURL=small-departure.component.js.map

/***/ }),

/***/ 195:
/***/ (function(module, exports, __webpack_require__) {

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
var core_1 = __webpack_require__(18);
var http_1 = __webpack_require__(66);
__webpack_require__(353);
var TramService = (function () {
    function TramService(http) {
        this.http = http;
    }
    // Method that will be used to store tram data
    TramService.prototype.storeTrams = function (data) {
        return this.http.post("/nextramdb", data);
    };
    TramService.prototype.storeDisruption = function (data) {
        return this.http.post('/reportdisruption', data);
    };
    return TramService;
}());
TramService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [typeof (_a = typeof http_1.Http !== "undefined" && http_1.Http) === "function" && _a || Object])
], TramService);
exports.TramService = TramService;
var _a;
//# sourceMappingURL=tram.service.js.map

/***/ }),

/***/ 350:
/***/ (function(module, exports) {

module.exports = "<navbar></navbar>\n<!-- Jumbotron for stopname -->\n<div class=\"jumbotron\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-2\"></div>\n      <div class=\"col-md-8\">\n        <h3>NEXTRAM</h3>\n        <h1>{{ stopName }}</h1>\n        <h2 *ngIf=\"stopNo\">Stop {{ stopNo }}</h2>\n        <p>Not here? <button class=\"btn\" onclick=\"location.href='../search'\">Change</button>\n      </div>\n      <div class=\"col-md-2\"></div>\n    </div>\n  </div>\n</div><!-- /jumbotron -->\n\n<div class=\"container-fluid\">\n  <!-- <div *ngFor=\"let key of processedGroupedDepts | keys;\"> -->\n    <div *ngFor=\"let row of processedGroupedDepts\" class=\"row match-my-cols\">\n      <div class=\"col-sm-6 nextram_box full text-center\"\n          attr.class=\"{{'col-sm-6 nextram_box text-center ' + crowdSourcedDisruptions[column[0].run_id]?.class.toLowerCase()}}\"\n          *ngFor=\"let column of row\"><div class=\"box padding-15px\">\n        <span class=\"{{ 'route_number_table route_number_' + routes[column[0].route_id].route_number }}\">{{ routes[column[0].route_id].route_number }}</span>\n        {{ 'to ' + directions[column[0].direction_id].direction_name }}\n\n        <h1></h1>\n\n        <div *ngFor=\"let departure of column; let i=index\">\n          <div *ngIf=\"i==0\">\n            <departure\n                [crowdSourcedDisruptions]=\"crowdSourcedDisruptions\"\n                [departure]=\"column[0]\"\n                [routes]=\"routes\"\n                [directions]=\"directions\">\n            </departure>\n          </div>\n        </div>\n\n        <div class=\"row\">\n          <div class=\"panel-group\" id=\"{{ 'accordion' + column[0].route_id + '-' + column[0].direction_id }}\">\n            <div class=\"panel panel-default\">\n              <div class=\"panel-heading\">\n                <h4 class=\"panel-title\"><a class=\"accordion-toggle collapsed\"\n                    data-toggle=\"collapse\"\n                    attr.data-parent=\"{{ '#accordion' + column[0].route_id + '-' + column[0].direction_id }}\"\n                    href=\"{{ '#collapse' + column[0].route_id + '-' + column[0].direction_id }}\">\n                  Next departures and reporting</a>\n                </h4>\n              </div>\n\n              <div id=\"{{ 'collapse' + column[0].route_id + '-' + column[0].direction_id }}\" class=\"panel-collapse collapse\">\n                <ul class=\"nav nav-pills center-pills\">\n                  <li class=\"active\"><a data-toggle=\"tab\" class=\"pill-tabs\" href=\"{{ '#moreDetails' + column[0].route_id + '-' + column[0].direction_id }}\">Next departures</a></li>\n                  <li><a data-toggle=\"tab\" class=\"pill-tabs\" href=\"{{ '#reportCrowd' + column[0].route_id + '-' + column[0].direction_id }}\">Report Crowd</a></li>\n                  <li><a data-toggle=\"tab\" class=\"pill-tabs\" href=\"{{ '#reportDisruption' + column[0].route_id + '-' + column[0].direction_id }}\">Report Disruption</a></li>\n                </ul>\n\n                <div class=\"tab-content\">\n                  <div class=\"tab-pane fade in active\" id=\"{{'moreDetails' + column[0].route_id + '-' + column[0].direction_id }}\">\n                      <div class=\"well\">\n                        <div *ngFor=\"let departure of column; let i=index\">\n\n                          <div *ngIf=\"i>0\">\n                            <smalldeparture\n                                [crowdSourcedDisruptions]=\"crowdSourcedDisruptions\"\n                                [departure]=\"departure\"\n                                [routes]=\"routes\"\n                                [directions]=\"directions\">\n                            </smalldeparture>\n                          </div>\n\n                        </div>\n                      </div><!-- end bunch -->\n                    </div>\n\n                  <div class=\"tab-pane fade in\" id=\"{{'reportCrowd' + column[0].route_id + '-' + column[0].direction_id }}\">\n                    <div class=\"well\" *ngIf=\"column[0].run_id != lastSubmitted?.run_id || !lastSubmitted\"> <!-- if not last submitted -->\n                      <div class=\"row\">\n                        <h5>Rate the crowding level of the tram below:</h5>\n                      </div>\n\n                      <div class=\"row\">\n                        <div class=\"col-xs-10 col-xs-offset-1\">\n                          <!-- Button crowdedness -->\n                          <button (click)=\"onInputData(column[0], 0)\"\n                                  (click)=\"onSubmitCrowdedness()\"\n                                  class=\"btn btn-success btn-lg clear_5px_top\" type=\"submit\" name=\"crowdedness\" value=\"0\">Empty</button>\n                          <button (click)=\"onInputData(column[0], 1)\"\n                                  (click)=\"onSubmitCrowdedness()\"\n                                  class=\"btn btn-success btn-lg clear_5px_top\" name=\"crowdedness\" value=\"1\" type=\"submit\">Decent</button>\n                          <button (click)=\"onInputData(column[0], 2)\"\n                                  (click)=\"onSubmitCrowdedness()\"\n                                  name=\"crowdedness\" value=\"2\" class=\"btn btn-warning btn-lg clear_5px_top\" type=\"submit\">Full</button>\n                          <button (click)=\"onInputData(column[0], 3)\"\n                                  (click)=\"onSubmitCrowdedness()\"\n                                  class=\"btn btn-danger btn-lg clear_5px_top\" type=\"submit\" name=\"crowdedness\" value=\"3\">Overcrowded</button>\n                        </div>\n                      </div>\n                    </div>\n                    <div class=\"well\" *ngIf=\"column[0].run_id == lastSubmitted?.run_id\"> <!-- if not last submitted -->\n                      <p>Thank you for submitting!</p>\n                    </div>\n                  </div>\n\n                  <div class=\"tab-pane fade in\" id=\"{{'reportDisruption' + column[0].route_id + '-' + column[0].direction_id }}\">\n                    <div class=\"well\" *ngIf=\"column[0].run_id != lastSubmittedDisruption?.run_id || !lastSubmittedDisruption\">\n                      <div class=\"row\">\n                        <h5>Describe any disruptions or inconveniences below:</h5>\n                      </div>\n\n                      <div class=\"row\">\n                        <div class=\"col-xs-10 col-xs-offset-1\">\n                          <div class=\"input-group\">\n                            <textarea [(ngModel)]=\"disruptionData.column[0].run_id\" class=\"form-control\" id=\"disruption\" placeholder=\"Enter here\" rows=\"2\"></textarea>\n                            <!-- TODO: fix fixed string -->\n                            <span (click)=\"onSubmitDisruption(column[0], 'disruptionData.column[0].run_id')\" class=\"input-group-addon btn btn-primary\">Submit</span>\n                          </div>\n                        </div>\n                      </div>\n\n                    </div>\n\n                    <div class=\"well\" *ngIf=\"column[0].run_id == lastSubmittedDisruption?.run_id\"> <!-- if not last submitted -->\n                      <p>Thank you for submitting!</p>\n                    </div>\n\n\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n\n\n\n\n      </div></div><!-- End of col -->\n\n    </div>\n  <!-- </div> -->\n</div>\n\n\n<footer>\n  <p>COPYRIGHT HOOKTURNS 2017</p>\n</footer>\n\n\n<!-- {{ departuresData?.status }}  http://stackoverflow.com/a/34738113: wait for Promise -->\n"

/***/ }),

/***/ 351:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 629:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(184);


/***/ })

},[629]);
//# sourceMappingURL=main.bundle.js.map