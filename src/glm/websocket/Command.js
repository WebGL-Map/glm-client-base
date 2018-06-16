import Event from "../event/Event";

/**
 * Represents a command object.
 *
 * @author Tyler Bucher
 */
export default class Command {

    /**
     * @param {Event} event the event object to pass.
     * @param {JSON} jsonObject the json object from the web socket message.
     */
    handle(event, jsonObject) {
        throw new Error('Method not implemented!');
    }
}