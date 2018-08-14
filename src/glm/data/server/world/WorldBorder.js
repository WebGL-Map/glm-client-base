import {Vector3} from "math.gl";

/**
 * A border of a given world.
 *
 * @author Tyler Bucher
 */
export default class WorldBorder {

    /**
     * @param {Vector3} center the center position of the border.
     * @param {number} diameter how long and wide the border is.
     */
    constructor(center, diameter) {
        /**
         * @type {Vector3} the center position of the border.
         */
        this.center = center;
        /**
         * @type {number} how long and wide the border is.
         */
        this.diameter = diameter;
    }

    /**
     * Checks to see if the world border contains a given position.
     *
     * @param {Vector3} position the position of the point.
     * @param {Vector3} center the center of the map.
     * @param {number} diameter the diameter of the world border.
     *
     * @return {boolean} true if the world border contains the given position false otherwise.
     */
    static containsPosition(position, center, diameter) {
        return this.containsPositionXZ(position.x, position.z, center, diameter);
    }

    /**
     * Checks to see if the world border contains a given position.
     *
     * @param {number} x the x position of the point.
     * @param {number} z the z position of the point.
     * @param {Vector3} center the center of the map.
     * @param {number} diameter the diameter of the world border.
     *
     * @return {boolean} true if the world border contains the given position false otherwise.
     */
    static containsPositionXZ(x, z, center, diameter) {
        let rad = diameter / 2.0;
        return x >= center.x - rad && x <= center.x + rad &&
            z >= center.z - rad && z <= center.z + rad;
    }

    /**
     * Checks to see if the world border contains a given chunk.
     *
     * @param {Vector3} position the position of the chunk.
     * @param {Vector3} center the center of the map.
     * @param {number} diameter the diameter of the world border.
     *
     * @return {boolean} true if the world border contains the given chunk false otherwise.
     */
    static containsChunk(position, center, diameter) {
        return this.containsChunkXZ(position.x, position.z, center, diameter);
    }

    /**
     * Checks to see if the world border contains a given chunk.
     *
     * @param {number} x the x position of the chunk.
     * @param {number} z the z position of the chunk.
     * @param {Vector3} center the center of the map.
     * @param {number} diameter the diameter of the world border.
     *
     * @return {boolean} true if the world border contains the given chunk false otherwise.
     */
    static containsChunkXZ(x, z, center, diameter) {
        let rad = diameter / 2.0;
        let nx  = x << 4;
        let nz  = z << 4;
        return nx >= center.x - rad && nx < center.x + rad &&
            nz >= center.z - rad && nz < center.z + rad;
    }
}