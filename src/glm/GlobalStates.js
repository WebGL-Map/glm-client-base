/**
 * The global states for which the DataManager can be in.
 *
 * @author Tyler Bucher
 */
export default class GlobalStates {

    /**
     * @returns {number} the initialization phase.
     */
    static get INIT() {
        return -1;
    }

    /**
     * @returns {number} a state where the DataManger is initializing need plugins and variables.
     */
    static get LOADING() {
        return 2;
    }

    /**
     * @returns {number} a state where the DataManger has connected to the server(s) and is done loading objects.
     */
    static get DONE() {
        return 3;
    }
}