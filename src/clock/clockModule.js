import {angular} from "../libs";
import {clockComponent} from "./clockComponent.js";

export const clockModule = angular.module('app.clock', [])
    .component("myClock", clockComponent)
    .name;
