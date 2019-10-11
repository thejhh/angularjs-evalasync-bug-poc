
export class ClockController {

    get name () {
        return "ClockController";
    }

    /**
     *
     * @param $scope {angular.IScope}
     * @param tickService {TickService}
     * @ngInject
     */
    constructor ($scope, tickService) {

        /**
         *
         * @member {angular.IScope}
         * @private
         */
        this._scope = $scope;

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
        console.log(`-- $doCheck @ ClockController --`);
    }

    $onInit () {

        // We don't use AngularJS $interval because we don't want a global digest to happen because of
        // our clock.
        this._interval = this._tickService.register(() => this._onInterval(), this );

    }

    $onDestroy () {

        if (this._interval !== undefined) {
            this._tickService.unregister(this._interval);
            this._interval = undefined;
        }

        this._scope = undefined;

    }

    /**
     *
     * @returns {string}
     */
    get time () {

        //console.log(`Time updated @ EventController`);

        const now = new Date();

        return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

    }

    /**
     * Note! This call is called outside of AngularJS digest loop.
     *
     * @private
     */
    _onInterval () {

        try {

            if (this._scope) {
                // We only want our component to do a local digest loop.
                //console.log(`Triggering local digest...`);
                this._scope.$digest();
            }

        } catch (err) {
            console.error(`Exception: `, err);
        }

    }

}
