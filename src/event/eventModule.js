import {angular} from "../libs";
import {eventComponent} from "./eventComponent.js";

export const eventModule = angular.module('app.event', [])
    .component("myEvent", eventComponent)
    .name;
