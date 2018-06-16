/**
 * A default event which can be extended. Used with the EventManager class.
 *
 * @author Tyler Bucher.
 */
export default class Event {

    /**
     * Creates a new event.
     *
     * @param {String} name the name of the event
     * @param {Object} data the data if any of the event.
     */
    constructor(name, data = {}) {
        this.name = name;
        this.data = data;
    }

    /**
     * @returns {String} the name of the event.
     */
    getName() {
        return this.name;
    }

    /**
     * @returns {Object} the data if any of the event.
     */
    getData() {
        return this.data;
    }
}