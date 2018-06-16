import {Vector3} from "math.gl";
import {Matrix4} from "math.gl";

/**
 * Helps with managing thw OpenGL camera view per world.
 *
 * @author Tyler Bucher
 */
export default class Camera {

    /**
     * @param {Vector3} position the initial position of the camera.
     */
    constructor(position) {
        /**
         * @type {Vector3} the position of the camera.
         */
        this.position = new Vector3(position.x, 200, position.z);
        /**
         * @type {Vector3} the position the camera is looking at.
         */
        this.lookAt = new Vector3(position.x, 0, position.z);
        /**
         * @type {Vector3} the up vector used in calculating the viewing matrix.
         */
        this.upVector = new Vector3(0, 0, -1);
        /**
         * @type {Matrix4} the viewing matrix for OpenGL.
         */
        this.viewMat = new Matrix4();
        /**
         * @type {Vector3} Helps with rotating the camera for the viewing matrix.
         */
        this.rotateVector = new Vector3();
        /**
         * @type {boolean} true if the camera needs to be updated false otherwise.
         */
        this.dirty = true;
    }

    /**
     * @return {boolean} true if the camera was updated false otherwise.
     */
    update() {
        if(this.dirty) {
            this.lookAt.x = this.position.x;
            this.lookAt.z = this.position.z;
            this.viewMat.lookAt({eye:this.position, center:this.lookAt, up:this.upVector});
            //this.viewMat.rotateXYZ(this.rotateVector);
            this.dirty = false;
            return true;
        }
        return false;
    }
}