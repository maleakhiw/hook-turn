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
var core_1 = require("@angular/core");
var departure_component_1 = require("./departure.component");
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