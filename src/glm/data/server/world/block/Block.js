import {Vector3} from "math.gl";

/**
 * Base block class. This should be extended before attempting to render.
 *
 * @author Tyler Bucher
 */
export default class Block {

    /**
     * Base constructor for a block.
     *
     * @param {Entry} blockType the id of the block.
     * @param {Vector3} position position of the block.
     *
     * @param {Array<Entry>} traits the block trait map.
     */
    constructor(blockType, position, traits) {
        // this blocks info
        this.blockType = blockType;
        this.position  = position;
        this.traits    = traits;
    }

    /**
     * @param {String} trait the trait to fetch.
     *
     * @returns {String | null} the trait value if present or undefined if not found.
     */
    getTrait(trait) {
        for (let kvp of this.traits) {
            if(trait === kvp.first) {
                return kvp.second;
            }
        }
        return null;
    }
}