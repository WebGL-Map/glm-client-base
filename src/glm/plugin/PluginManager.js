import Plugin from './Plugin'

/**
 * Helps to manage the list of plugins.
 *
 * @author Tyler Bucher
 */
export default class PluginManager {

    /**
     * Creates a new plugin manager.
     */
    constructor() {

        /**
         * @type {Array<Plugin>} the list of plugins which this object manages.
         */
        this.pluginList = [];
    }

    /**
     * @param {Plugin} plugin the plugin to register.
     */
    registerPlugin(plugin) {
        this.pluginList.push(plugin);
    }
}