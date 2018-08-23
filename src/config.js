/**
 * Holds fields for the base glm library to use.
 *
 * @type {Object} a basic javascript object for holding config fields.
 *
 * @author Tyler Bucher
 */
var GLM_CONFIG = {

    /**
     * States if the client should enable and use debug functions. This usually results in json being outputted to the
     * console.
     *
     * @type {boolean} true if the client should use debug functions false other wise.
     */
    debug: false,

    /**
     * States if the client should should log WebSocket messages in plain text. debug must be enabled for this field to
     * work.
     *
     * @type {Boolean} true if the client should log WebSocket messages in plain text false otherwise.
     */
    debugWebSocketRaw: false,

    /**
     * Specifies the type of WebSocket protocol to use for the web page.
     *
     * @type {String} ws for non encrypted web pages wss for ssl encrypted web pages.
     */
    wsProtocol: 'ws',

    /**
     * Specifies the maps uuid in string form.
     *
     * @type {String} the string form of the the map uuid.
     */
    uuid: '8a5ad958-655e-4fbf-b662-fcca5fd92a61'
};