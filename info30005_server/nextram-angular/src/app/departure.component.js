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
var DepartureComponent = (function () {
    function DepartureComponent() {
    }
    /* formats the time string to a time from now */
    DepartureComponent.prototype.minsToNow = function (dateTimeString) {
        var date = new Date(dateTimeString);
        var time = date.getTime() - new Date().getTime();
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
        template: "\n  <div class=\"upcoming-tram\">\n    <h1>{{ minsToNow(departure.estimated_departure_utc) }}</h1>\n  </div>\n\n  <div class=\"progress\">\n    <div aria-valuemax=\"60\" aria-valuemin=\"0\" aria-valuenow=\"40\" class=\"{{'progress-bar progress-bar-' + crowdSourcedDisruptions[departure.run_id]?.class.toLowerCase()}}\"\n        role=\"progressbar\" [ngStyle]=\"{width: calculateWidth(departure.run_id)}\">\n      {{crowdSourcedDisruptions[departure.run_id]?.class}}\n    </div><span *ngIf=\"crowdSourcedDisruptions[departure.run_id]?.class == 'Empty'\">{{crowdSourcedDisruptions[departure.run_id]?.class}}</span> <!-- if empty, will be squished by 0% width progress bar -->\n  </div>\n  "
    })
], DepartureComponent);
exports.DepartureComponent = DepartureComponent;
//# sourceMappingURL=departure.component.js.map