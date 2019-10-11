import {angular} from "./libs.js";
import {clockModule} from "./clock/clockModule.js";
import {eventModule} from "./event/eventModule.js";
import {TickService} from "./TickService.js";

export const myApp = angular.module('app', [
    clockModule,
    eventModule
])
    .service("tickService", TickService)
    .config(['$compileProvider', $compileProvider => {
        $compileProvider.debugInfoEnabled(true);
    }])
    .name;
