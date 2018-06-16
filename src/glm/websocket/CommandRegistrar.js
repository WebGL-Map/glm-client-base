import Event from "../event/Event";

/**
 * Handles commands coming from the glm server.
 *
 * @author Tyler Bucher
 */
export default class CommandRegistrar {

    /**
     * Creates a new command registrar.
     */
    constructor() {

        /**
         * @type {Map<String, Command>}
         */
        this.commandMap = new Map();
    }

    /**
     * Attempts to register a command for a function.
     *
     * @param {String} key the command name in string form.
     * @param {Command} command the function which handles the command.
     */
    registerCommand(key, command) {
        this.commandMap.set(key, command);
    }

    /**
     * Passes a potential command to a given function in the command list.
     *
     * @param {Event} event the event object.
     * @param {JSON} jsonObject a json object which holds the command and data.
     */
    handleCommand(event, jsonObject) {
        let command = null;
        // Check for command in json
        if (!("cmd" in jsonObject)) {
            if (!("command" in jsonObject)) {
                return;
            } else {
                command = "command";
            }
        } else {
            command = "cmd";
        }
        // pass off command to function if present
        if (this.commandMap.has(jsonObject[command])) {
            this.commandMap.get(jsonObject[command]).handle(event, jsonObject);
        }
    }
}