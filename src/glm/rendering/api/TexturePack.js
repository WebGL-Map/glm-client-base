import Camera from "../../data/server/world/Camera";
import Entry from "../../data/server/world/block/Entry";
import Chunk from "../../data/server/world/Chunk";
import Block from "../../data/server/world/block/Block";

/**
 * Helps render different blocks,  players and other items.
 *
 * @author Tyler Bucher
 */
export default class TexturePack {

    /**
     * Initializes the texture pack.
     */
    init() {
        throw new Error('Method not implemented!');
    }

    /**
     * Creates a unique block from the texture pack.
     *
     * @param {Entry} blockType the type of block to create.
     * @param {Number} x the x position.
     * @param {Number} y the y position.
     * @param {Number} z the z position.
     *
     * @return {Block} the newly created block.
     */
    createBlock(blockType, x, y, z) {
        throw new Error('Method not implemented!');
    }

    /**
     * Creates a new chunk from the texture pack.
     *
     * @param {Array} dataArray the list of block data to create blocks from.
     * @param {Array} heightDataArray the list of block height positions.
     * @param {Number} x the x position.
     * @param {Number} y the y position.
     * @param {Number} z the z position.
     *
     * @return {Chunk} the newly created chunk.
     */
    createChunk(dataArray, heightDataArray, x, y, z) {
        throw new Error('Method not implemented!');
    }

    /**
     * Updates a given chunk with new block information and height data.
     *
     * @param {Chunk} chunk the chunk to update.
     * @param {Array} dataArray the list of block data to update blocks from.
     * @param {Array} heightDataArray the list of block height positions.
     */
    updateChunk(chunk, dataArray, heightDataArray) {
        throw new Error('Method not implemented!');
    }

    /**
     * Creates a new player object.
     *
     * @param {String} name the name of the player.
     * @param {String} id the id of the player.
     * @param {Vector3} position the position of the player.
     *
     * @return {Player} the newly created player.
     */
    createPlayer(name, id, position) {
        throw new Error('Method not implemented!');
    }

    /**
     * The player to update.
     *
     * @param {Player} player the player to update.
     * @param {Vector3} newPosition the position of the player.
     */
    updatePlayer(player, newPosition) {
        throw new Error('Method not implemented!');
    }

    /**
     * Creates a new world.
     *
     * @param {String} id the uuid of the world.
     * @param {String} name the name of the world.
     * @param {boolean} isDefault states if this world is default.
     * @param {Vector3} spawnPoint the spawn point of the world.
     */
    createWorld(id, name, isDefault, spawnPoint) {
        throw new Error('Method not implemented!');
    }

    /**
     * Attempts to render a set of chunks.
     *
     * @param {Camera} camera the camera to use for render testing.
     * @param {Map<int, Map<int, Chunk>>} chunkMap the map of chunks to render.
     */
    renderBlocks(camera, chunkMap) {
        throw new Error('Method not implemented!');
    }

    /**
     * Attempts to render the players within the cameras view for the provided world.
     *
     * @param {Camera} camera the camera of the provided world.
     * @param {World} world the world to render players from.
     */
    renderPlayers(camera, world) {
        throw new Error('Method not implemented!');
    }
}