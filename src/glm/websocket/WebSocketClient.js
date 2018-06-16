/**
 * The client web socket object.
 *
 * @author Tyler Bucher
 */
export default class WebSocketClient {

    /**
     * Creates a new web socket client object.
     *
     * @param {WebSocket} webSocket the web socket to use.
     * @param {Function} errorFunc the error function.
     * @param {Function} openFunc the open function.
     * @param {Function} messageFunc the message function.
     * @param {Function} closeFunc the close function.
     */
    constructor(webSocket, errorFunc, openFunc, messageFunc, closeFunc) {
        this.webSocket = webSocket;
        WebSocketClient._setFunctions(this.webSocket, errorFunc, openFunc, messageFunc, closeFunc);
    }

    /**
     * Sets the functions for the native socket to use.
     *
     * @param {WebSocket} webSocket the web socket to use.
     * @param {Function} errorFunc the error function.
     * @param {Function} openFunc the open function.
     * @param {Function} messageFunc the message function.
     * @param {Function} closeFunc the close function.
     */
    static _setFunctions(webSocket, errorFunc, openFunc, messageFunc, closeFunc) {
        webSocket.addEventListener('error', errorFunc);
        webSocket.addEventListener('open', openFunc);
        webSocket.addEventListener('message', messageFunc);
        webSocket.addEventListener('close', closeFunc);
    }

    /**
     * @returns {WebSocket} the native js web socket object.
     */
    getNative() {
        return this.webSocket;
    }
}