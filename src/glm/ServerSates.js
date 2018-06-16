/**
 * The states for which a server can be in.
 *
 * @author Tyler Bucher
 */
export default class ServerStates {

    /**
     * @returns {number} a state representative of an error.
     */
    static get ERROR() {
        return -1;
    }

    /**
     * @returns {number} a state representing of a closed server.
     */
    static get CLOSED() {
        return 0;
    }

    /**
     * @returns {number} a state representing an open server.
     */
    static get OPEN() {
        return 1;
    }

    /**
     * @returns {number} a state representing a server which is ready.
     */
    static get READY() {
        return 2;
    }

    /**
     * @returns {number} a state representing a server which is in the initialization phase.
     */
    static get INIT() {
        return 3;
    }

    /**
     * @returns {number} a state representing a server which is in the process of getting worlds from a remote location.
     */
    static get GET_WORLDS() {
        return 4;
    }

    /**
     * @returns {number} a state representing a server which is ready to render to the web gl canvas.
     */
    static get RENDER_READY() {
        return 5;
    }
}