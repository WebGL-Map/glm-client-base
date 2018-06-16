import {Vector3} from "math.gl";
import Block from "./block/Block";

/**
 * Chunk object type for rendering in the map.
 *
 * @author Tyler Bucher
 */
export default class Chunk {

    /**
     * Creates a chunk for blocks.
     *
     * @param {Vector3} position the position of this chunk.
     */
    constructor(position) {
        /**
         * @type {Vector3} the position of this chunk.
         */
        this.position = position;
        /**
         * @type {Map<Number, Map<Number, Map<Number, Block>>>} the map of blocks this chunk holds.
         */
        this.blockMap = new Map();
    }
}