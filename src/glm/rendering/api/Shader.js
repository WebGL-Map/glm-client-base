/**
 * An object which represents an OpenGL shader object.
 *
 * @author Tyler Bucher.
 */
export default class Shader {

    /**
     * @param {WebGLRenderingContext} glInstance the WebGL context for rendering.
     * @param {Number} type the type of WebGL shader.
     * @param {String} source the string source code of the shader.
     */
    constructor(glInstance, type, source) {
        this.nativeShader = glInstance.createShader(type);
        this.type         = type;
        this.source       = source;
        // Set shader source and compile it
        if (this.nativeShader != null) {
            glInstance.shaderSource(this.nativeShader, this.source);
            glInstance.compileShader(this.nativeShader);
        }
    }

    /**
     * Verify that the shader was compiled successfully.
     *
     * @param {WebGLRenderingContext} glInstance the WebGL context for rendering.
     *
     * @returns {boolean} true if the shader was compiled successfully false otherwise.
     */
    verify(glInstance) {
        return glInstance.getShaderParameter(this.nativeShader, glInstance.COMPILE_STATUS);
    }
}