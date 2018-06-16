import CommandRegistrar from "./websocket/CommandRegistrar";
import Event from "./event/Event";
import EventManager from "./event/EventManager";
import PluginManager from "./plugin/PluginManager";
import GlobalStates from "./GlobalStates";
import {GLM_CONFIG} from "../config";
import Server from "./data/server/Server";
import Util from "./util/Util";
import {Stats} from "stats.js";

/**
 * Holds the id of an animation frame given from requestAnimationFrame.
 *
 * @type {Number} the id of an animation frame.
 */
export let _requestAnimationFrameId;

/**
 * The global " singleton " DataManager object. If the program is running this should never be null.
 *
 * @type {DataManager} the global DataManager object.
 */
export let dataManager = null;

/**
 * @type {Event} the pre chunks render event.
 * @private
 */
export const _preTerrainRender = new Event('preTerrainRender');

/**
 * @type {Event} the post chunks render event.
 * @private
 */
export const _postTerrainRender = new Event('postTerrainRender');

/**
 * @type {Event} the pre players render event.
 * @private
 */
export const _prePlayersRender = new Event('prePlayersRender');

/**
 * @type {Event} the post players render event.
 * @private
 */
export const _postPlayersRender = new Event('postPlayersRender');

/**
 * The global container object.
 *
 * @author Tyler Bucher
 */
export class DataManager {

    /**
     * @param loadingTextElement the jQuery html element for which the loading text appears.
     * @param canvasElement the jQuery html element for which draws the WebGL objects.
     * @param bodyElement the jQuery html element for which holds the body div.
     */
    constructor(loadingTextElement, canvasElement, bodyElement) {
        /** @type {number} the state at which the DataManager is in.*/
        this.state = GlobalStates.INIT;
        /** @type {jQuery} the jQuery html element for which the loading text appears.*/
        this.loadingTextElement = loadingTextElement;
        /** @type {jQuery} the jQuery html element for which draws the WebGL objects.*/
        this.canvasElement = canvasElement;
        /** @type {jQuery} the jQuery html element for which holds the body div.*/
        this.bodyElement = bodyElement;
        /** @type {Stats} the debug status element.*/
        this.stats = new Stats();
        /** @type {jQuery} the jquery error element for when the primary server fails to connect to the server.*/
        this.errorAlert = $('<div></div>');
        this.errorAlert.attr('id', 'wsErrorAlert');
        this.errorAlert.addClass("alert alert-danger alert-dismissible alert-fix fade show");
        this.errorAlert.attr('role', "alert");
        this.errorAlert.html('Error, could not connect to server' +
            '<span id="wsErrorAlert-errorid" aria-hidden="true">.</span>' +
            '<button type="button" class="close" data-dismiss="alert" aria-label="Close">' +
            '<span aria-hidden="true">&times;</span>' +
            '</button>');
        /** @type {EventManager} the manager for when events need to be called.*/
        this.eventManager = new EventManager();
        /** @type {CommandRegistrar} the registrar which registers command handlers.*/
        this.commandRegistrar = new CommandRegistrar();
        /** @type {PluginManager} the manager which handles and controls the plugins.*/
        this.pluginManager = new PluginManager();
        /** @type {number} the time in milliseconds when a new chunk should be fetched.*/
        this.chunkCacheLifetime = 0;
        /** @type {Array<Entry> | null} a list of block types from the server.*/
        this.blockTypes         = null;
        /** @type {Array<Entry> | null} a list of block traits from the server.*/
        this.blockTraits        = null;
        /** @type {Map<String, Server> | null} a map of all available servers this map can access.*/
        this.serverMap          = null;
        /** @type {Server | null} the primary server this map connected to.*/
        this.primaryServer      = null;
        /** @type {Server | null} the currently selected server.*/
        this.selectedServer     = null;
        /** @type {World | null} the currently selected world.*/
        this.selectedWorld      = null;
        /** @type {TexturePack | null} the texture pack to use for data generation and rendering.*/
        this.texturePack = null;
    }

    /**
     * Initializes this dataManager object.
     */
    init() {
        // Initialize plugins.
        this.pluginManager.pluginList.forEach(function (plugin) {
            plugin.initialize();
        });
        // Initialize data manger
        this.eventManager.dispatchEvent(new Event("preInit"));
        this.blockTypes  = [];
        this.blockTraits = [];
        this.serverMap   = new Map();
        this.state = GlobalStates.LOADING;
        this.eventManager.dispatchEvent(new Event("postInit"));
    }

    /**
     * @param {String} ip the ip / hostname of the server to connect to.
     * @param {number} port the port to connect on.
     */
    connectToMainServer(ip, port) {
        if (this.primaryServer != null) {
            this.cleanUp();
        }
        // Append / if ip is a hostname
        if (!Util.ipv4Check(ip)) {
            if (ip.charAt(ip.length - 1) !== '/') {
                ip += '/';
            }
        }
        // Connect to primaryServer
        let url            = GLM_CONFIG.wsProtocol + '://' + ip + ':' + port + '/';
        this.primaryServer = new Server(ip + ':' + port, ip, port);
        this.serverMap.set(url, this.primaryServer);
        this.primaryServer.tryWebSocket();
    }

    /**
     * @param {String} ip the ip / hostname of the server to connect to.
     * @param {number} port the port to connect on.
     */
    connectToServer(ip, port) {
        let nServer = new Server(ip + ':' + port, ip, port);
        // Append / if ip is a hostname
        if (!Util.ipv4Check(ip)) {
            if (ip.charAt(ip.length - 1) !== '/') {
                ip += '/';
            }
        }
        // connect to additional server
        let url = GLM_CONFIG.wsProtocol + '://' + ip + ':' + port + '/';
        this.serverMap.set(url, nServer);
        nServer.tryWebSocket();
    }

    /**
     * Try to display an error message if present.
     *
     * @param {number | null} errorNum the error number from a WebSocket if present.
     */
    tryError(errorNum = null) {
        // Go back to login
        $('#loadingDiv').fadeOut('fast', function () {
            let mainForum = $('#mainForm');
            if (!mainForum.hasClass('has-ws-error')) {
                window.dataManager.errorAlert.clone().insertAfter($('.login-title'));
                if (errorNum != null) {
                    $('#wsErrorAlert-errorid').text(': ' + errorNum);
                }
                mainForum.addClass('has-ws-error');
                $('#wsErrorAlert').on('closed.bs.alert', function () {
                    mainForum.removeClass('has-ws-error');
                    console.log('closed');
                });
            }
            mainForum.fadeIn('fast');
        });
        this.eventManager.dispatchEvent(new Event('serverError'));
        this.cleanUp();
    }

    /**
     * Initializes OpenGL.
     */
    initGlm() {
        if (this.state === GlobalStates.LOADING) {
            this.eventManager.dispatchEvent(new Event('preInitGl'));
            // set size and add call back;
            this.canvasElement[0].width  = window.innerWidth;
            this.canvasElement[0].height = window.innerHeight;
            this.texturePack.init();
            // setup glm
            this._addStats();
            this.state = GlobalStates.DONE;
            this.eventManager.dispatchEvent(new Event('postInitGl'));
            window._requestAnimationFrameId = requestAnimationFrame(DataManager.draw);
        }
    }

    /**
     * Add the stats window to the mapDiv dom.
     * @private
     */
    _addStats() {
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        this.stats.dom.id            = "stats";
        this.stats.dom.style.top     = "1.5625rem";
        this.stats.dom.style.left    = ""; // unset left
        this.stats.dom.style.right   = "1.5625rem";
        this.stats.dom.style.display = GLM_CONFIG.debug ? "inherit" : "none";
        $('#mapDiv').append(this.stats.dom);
    }

    /**
     * @param {String} url the url of the server to select.
     */
    selectServer(url) {
        this.selectedServer = this.serverMap.get(url);
        this.eventManager.dispatchEvent(new Event('selectServer'));
    }

    /**
     * @param {String} worldId the uuid of the world to select.
     */
    selectWorld(worldId) {
        this.selectedWorld              = this.selectedServer.worldMap.get(worldId);
        this.selectedWorld.camera.dirty = true;
        this.eventManager.dispatchEvent(new Event('selectWorld'));
    }

    /**
     * Remove and clear all list and extra data made from initialization.
     */
    cleanUp() {
        this.eventManager.dispatchEvent(new Event('cleanUp'));
        cancelAnimationFrame(window._requestAnimationFrameId);
        this.eventManager.eventMap.clear();
        this.commandRegistrar.commandMap.clear();
        this.serverMap.clear();
        this.primaryServer = null;
        this.state         = GlobalStates.INIT;
    }

    /**
     * Attempts to draw frames to the current OpenGL context And queue this function to be called again by the browser.
     */
    static draw() {
        if (GLM_CONFIG.debug) window.dataManager.stats.begin();
        // Render blocks
        window.dataManager.eventManager.dispatchEvent(window._preTerrainRender);
        window.dataManager.texturePack.renderBlocks(window.dataManager.selectedWorld.camera, window.dataManager.selectedWorld.chunkMap);
        window.dataManager.eventManager.dispatchEvent(window._postTerrainRender);
        // Render players
        window.dataManager.eventManager.dispatchEvent(window._prePlayersRender);
        window.dataManager.texturePack.renderPlayers(window.dataManager.selectedWorld.camera, window.dataManager.selectedWorld);
        window.dataManager.eventManager.dispatchEvent(window._postPlayersRender);

        if (GLM_CONFIG.debug) window.dataManager.stats.end();

        window._requestAnimationFrameId = requestAnimationFrame(DataManager.draw);
    }
}