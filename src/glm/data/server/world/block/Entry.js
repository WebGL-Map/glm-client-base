/**
 * A simple kvp object.
 *
 * @author Tyler Bucher
 */
export default class Entry {

    /**
     * Creates a new kvp object. The key and value should be a string, however because this is javascript
     * I can not stop you form making it what ever you please.
     *
     * @param {String} first the key object.
     * @param {String} second the value object.
     */
    constructor(first, second) {
        this.first  = first;
        this.second = second;
    }
}