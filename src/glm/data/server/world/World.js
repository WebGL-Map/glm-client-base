import Camera from "./Camera";
import {Vector3} from "math.gl";

/**
 * Creates a new world. Mainly to be used by the Server objects.
 *
 * @author Tyler Bucher
 */
export default class World {

    /**
     * Creates a new world.
     *
     * @param {String} id the uuid of the world.
     * @param {String} name the name of the world.
     * @param {boolean} isDefault states if this world is default.
     * @param {Vector3} spawnPoint the spawn point of the world.
     */
    constructor(id, name, isDefault, spawnPoint) {
        /**
         * @type {String} the name of the world.
         */
        this.name = name;
        /**
         * @type {String} the uuid of this world.
         */
        this.uuid = id;
        /**
         * @type {Vector3} the player spawn point of this world.
         */
        this.spawnPoint = spawnPoint;
        /**
         * @type {boolean} states if this world is the default world of a server.
         */
        this.isDefault = isDefault;
        /**
         * @type {WorldBorder | null} the world border for this world.
         */
        this.worldBorder = null;
        /**
         * @type {Map<int, Map<int, Chunk>>} a map of chunks for this world.
         */
        this.chunkMap = new Map();
        /**
         * @type {Camera} the camera for viewing this world.
         */
        this.camera = new Camera(this.spawnPoint);
        /**
         * @type {Map<String, Player>} the map of players which are on this server.
         */
        this.playerMap = new Map();
    }

    /**
     * @param {number} x the x position.
     * @param {number} z the z position.
     * @return {Chunk | null} the chunk at the given position or null if not found.
     */
    getChunkOrNull(x, z) {
        let xMap = this.chunkMap.get(x);
        return xMap != null ? xMap.get(z) : null;
    }
}