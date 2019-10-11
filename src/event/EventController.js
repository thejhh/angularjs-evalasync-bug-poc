
/** This simulates something like a websocket stream */
const BUFFER = [];

export class EventController {

    get name () {
        return "EventController";
    }

    /**
     *
     * @param $scope {angular.IScope}
     * @param $rootScope {angular.IScope}
     * @param tickService {TickService}
     * @ngInject
     */
    constructor ($scope, $rootScope, tickService) {

        /**
         *
         * @member {number}
         * @private
         */
        this._id = 0;

        /**
         *
         * @member {angular.IScope}
         * @private
         */
        this._scope = $scope;

        /**
         *
         * @member {angular.IScope}
         * @private
         */
        this._rootScope = $rootScope;

        /**
         *
         * @member {TickService}
         * @private
         */
        this._tickService = tickService;

        /**
         *
         * @member {string|undefined}
         * @private
         */
        this._interval = undefined;

    }

    $doCheck () {
        console.log(`-- $doCheck @ EventController --`);
    }

    $onInit () {

        // This simulates something like websocket stream which comes outside of AngularJS
        this._interval = this._tickService.register(() => {
            if (BUFFER.length) {
                this._onEvent(BUFFER.shift());
            }
        }, this);

    }

    $onDestroy () {

        if (this._interval !== undefined) {
            this._tickService.unregister(this._interval);
            this._interval = undefined;
        }

        this._scope = undefined;

    }

    onClick () {

        console.log(`Button clicked.`);

        // We simulate something like a request to backend to go to next id
        BUFFER.push( this._id + 1 );

    }

    _onEvent (id) {

        try {

            console.log(`Scheduling $evalAsync() (${this._rootScope ? this._rootScope.$$phase : 'destroyed'})`);
            this._scope.$evalAsync(() => {
                this._id = id;
                console.trace(`$evalAsync done and ID is now ${this._id} (${this._rootScope ? this._rootScope.$$phase : 'destroyed'})`);
            });

        } catch (err) {
            console.error(`Exception: `, err);
        }

    }

    get id () {

        console.log(`ID updated @ EventController`);

        return this._id;
    }

    isTicksStarted () {
        return this._tickService.isStarted();
    }

    startTicks () {
        return this._tickService.start();
    }

    stopTicks () {
        return this._tickService.stop();
    }

}
