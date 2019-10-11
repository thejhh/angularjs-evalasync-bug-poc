
/**
 * Interval to perform ticks in milliseconds
 *
 * @type {number}
 */
const TICK_INTERVAL = 3000;

export class TickService {

    constructor () {

        /**
         *
         * @member {number|undefined}
         * @private
         */
        this._interval = undefined;

        /**
         * Registered callbacks.
         *
         * @member {Array}
         * @private
         */
        this._callbacks = [];

    }

    start () {

        if (this._interval !== undefined) {
            throw new TypeError(`Interval was already started`);
        }

        this._interval = setInterval( () => this._onInterval(), TICK_INTERVAL);

    }

    stop () {

        if (this._interval) {
            clearInterval(this._interval);
            this._interval = undefined;
        }

    }

    /**
     *
     * @returns {boolean}
     */
    isStarted () {
        return this._interval !== undefined;
    }

    /**
     *
     * @param callback {Function}
     * @param parent {{name: string}}
     * @returns {string}
     */
    register (callback, parent) {

        this._callbacks[parent.name] = callback;

        console.log(`Registered ${parent.name}`);

        return parent.name;
    }

    /**
     *
     * @param parent {{name: string}}
     */
    unregister (parent) {

        delete this._callbacks[parent.name];

    }

    /**
     * Calls each registered callback
     *
     * @private
     */
    _onInterval () {

        if (this._callbacks) {

            if (this._callbacks.EventController) this._callbacks.EventController();
            if (this._callbacks.ClockController) this._callbacks.ClockController();

        }

    }

}
