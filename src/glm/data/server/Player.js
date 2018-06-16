/**
 * Creates a new player.
 *
 * @author Tyler Bucher
 */
export default class Player {

    /**
     * Creates a new Player.
     *
     * @param {String} name the name of the player.
     * @param {String} id the id of the player.
     * @param {Vector3} position the position of the player.
     */
    constructor(name, id, position) {
        this.name     = name;
        this.id       = id;
        this.position = position;
    }
}