import WebSocketClient from "../../websocket/WebSocketClient";
import ServerStates from "../../ServerSates";

/**
 * Creates a new server and WebSocket connection.
 *
 * @author Tyler Bucher
 */
export default class Server {

    /**
     * Creates a new server object.
     *
     * @param {String} name the name of the server.
     * @param {String} ip the ip of the server.
     * @param {number} port the port of the server.
     */
    constructor(name, ip, port) {
        /**
         * @type {String} the name of this server.
         */
        this.name            = name;
        /**
         * @type {String} the ip or address of the server.
         */
        this.ip              = ip;
        /**
         * @type {number} the port of the server.
         */
        this.port            = port;
        /**
         * @type {number} the sate of this server.
         */
        this.state           = ServerStates.CLOSED;
        /**
         * @type {WebSocketClient | null} the WebSocketClient connection.
         */
        this.webSocketClient = null;
        /**
         * @type {Map<String, World>} the map of worlds for this server.
         */
        this.worldMap = new Map();
    }

    /**
     * Attempts to connect to a server using this WebSocket.
     */
    tryWebSocket() {
        this.webSocketClient = new WebSocketClient(
            new WebSocket(window.GLM_CONFIG.wsProtocol + '://' + this.ip + ':' + this.port + '/'),
            /**
             * On error function.
             *
             * @param {Event} event the event from the WebSocket.
             */
            function (event) {
                // Debug info
                if (window.GLM_CONFIG.debug) {
                    if (window.GLM_CONFIG.debugWebSocketRaw) {
                        console.log(event);
                    }
                }
                // Try to print error if there is an error.
                if (event.currentTarget.readyState !== 2 && event.currentTarget.readyState !== 3) {
                    window.dataManager.tryError();
                }
            },
            /**
             * On open function.
             *
             * @param {Event} event the event from the WebSocket.
             */
            function (event) {
                // debug info
                if (window.GLM_CONFIG.debug) {
                    if (window.GLM_CONFIG.debugWebSocketRaw) {
                        console.log(event);
                    }
                }
                // Send client uuid to server
                window.dataManager.serverMap.get(event.target.url).webSocketClient.getNative().send(JSON.stringify({
                    cmd: "setClientUuid",
                    data: {
                        uuid: window.GLM_CONFIG.uuid
                    }
                }));
                // request info when socket is opened.
                if(window.dataManager.serverMap.get(event.target.url) === window.dataManager.primaryServer) {
                    window.dataManager.primaryServer.webSocketClient.getNative().send(JSON.stringify({
                        cmd: "getServers"
                    }));
                }
                // call init command for this server.
                window.dataManager.serverMap.get(event.target.url).webSocketClient.getNative().send(JSON.stringify({
                    cmd: "init"
                }));
            },
            /**
             * On message function.
             *
             * @param {MessageEvent} event the event from the WebSocket.
             */
            function (event) {
                let jsonParse = null;
                // Debug info
                if (window.GLM_CONFIG.debug) {
                    if (window.GLM_CONFIG.debugWebSocketRaw) {
                        console.log(event);
                    }
                    jsonParse = JSON.parse(event.data);
                    console.log(jsonParse);
                } else {
                    jsonParse = JSON.parse(event.data);
                }
                window.dataManager.commandRegistrar.handleCommand(event, jsonParse);
            },
            /**
             * On close function.
             *
             * @param {CloseEvent} event the event from the WebSocket.
             */
            function (event) {
                // Debug info
                if (window.GLM_CONFIG.debug) {
                    if (window.GLM_CONFIG.debugWebSocketRaw) {
                        console.log(event);
                    }
                }
                // todo only close on main as a feature for a future version
                window.dataManager.tryError(event.code);
            });
        this.state           = this.webSocketClient.getNative().readyState === 1 ? ServerStates.OPEN : ServerStates.CLOSED;
    }
}