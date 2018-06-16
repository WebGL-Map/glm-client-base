/**
 * An object for holding data related to chunk request information.
 *
 * @author Tyler Bucher
 */
export default class ChunkRequestInfo {

    /**
     * @param {number} x the x position of the chunk.
     * @param {number} z the z position of the chunk.
     * @param {number} time the time in milliseconds when a chunk was requested.
     */
    constructor(x, z, time) {
        /**
         * @type {{x: number, y: number, z: number}} the position of the chunk.
         */
        this.downloadInfo = {x: x, y: 0, z: z};
        /**
         * @type {number} the time in milliseconds when the chunk at the given position was requested.
         */
        this.time = time;
    }
}