import Camera from "../../data/server/world/Camera";
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
     * @param {String} blockType the type of block to create.
     * @param {Number} x the x position.
     * @param {Number} y the y position.
     * @param {Number} z the z position.
     *
     * @return {Block|null} the newly created block or null.
     */
    createBlock(blockType, x, y, z) {
        throw new Error('Method not implemented!');
    }

    /**
     * Updates a unique block from the texture pack.
     *
     * @param {Block} block the block to update.
     * @param {String} blockType the type of block to create.
     * @param {Number} x the x position.
     * @param {Number} y the y position.
     * @param {Number} z the z position.
     *
     * @return {Block|null} the newly created block or null.
     */
    updateBlock(block, blockType, x, y, z) {
        throw new Error('Method not implemented!');
    }

    /**
     * Creates a new chunk from the texture pack.
     *
     * @param {String} type the type of chunk to make.
     * @param {Array} dataArray the list of block data to create blocks from.
     * @param {Array} biomeArray the list of block biome information.
     * @param {Array} heightIndexArray the list of block indices.
     * @param {Number} x the x position.
     * @param {Number} y the y position.
     * @param {Number} z the z position.
     *
     * @return {Chunk|null} the newly created chunk or null.
     */
    createChunk(type, dataArray, biomeArray, heightIndexArray, x, y, z) {
        throw new Error('Method not implemented!');
    }

    /**
     * Updates a given chunk with new block information and height data.
     *
     * @param {String} type the type of chunk to make.
     * @param {Array} dataArray the list of block data to create blocks from.
     * @param {Array} biomeArray the list of block biome information.
     * @param {Array} heightIndexArray the list of block indices.
     */
    updateChunk(type, dataArray, biomeArray, heightIndexArray) {
        throw new Error('Method not implemented!');
    }

    /**
     * Creates a new player object.
     *
     * @param {String} name the name of the player.
     * @param {String} id the id of the player.
     * @param {Vector3} position the position of the player.
     *
     * @return {Player|null} the newly created player or null.
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
     *
     * @return {World|null} the newly crated world or null.
     */
    createWorld(id, name, isDefault, spawnPoint) {
        throw new Error('Method not implemented!');
    }

    /**
     * Creates a new world border
     *
     * @param {Vector3} center the center position of the border.
     * @param {Number} diameter the diameter of the border.
     *
     * @return {WorldBorder|null} the newly created world border or null.
     */
    createWorldBorder(center, diameter) {
        throw new Error('Method not implemented!');
    }

    /**
     * Attempts to render a set of chunks.
     *
     * @param {Camera} camera the camera to use for render testing.
     * @param {Map<String, Map<int, Map<int, Chunk>>>} chunkMap the map of chunks to render.
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