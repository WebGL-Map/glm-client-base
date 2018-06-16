import Event from "./Event";

/**
 * Handles event registering and distribution.
 *
 * @author Tyler Bucher
 */
export default class EventManager {

    /**
     * Creates a new EventManager.
     */
    constructor() {

        /**
         * @type {Map<String, Function[]>} holds a map of event listeners to events.
         */
        this.eventMap = new Map();
    }

    /**
     * Add a callback for an event.
     *
     * @param {String} eventName the name of the event.
     * @param {Function} callback the function to call when the event is fired.
     */
    registerListener(eventName, callback) {
        if (this.eventMap.get(eventName) == null) {
            this.eventMap.set(eventName, []);
        }
        this.eventMap.get(eventName).push(callback);
    }

    /**
     * Dispatch an event.
     *
     * @param {Event} event the event to dispatch.
     */
    dispatchEvent(event) {
        let funcArray = this.eventMap.get(event.getName());
        if (funcArray != null) {
            for (let func of funcArray) {
                func(event);
            }
        }
    }
}