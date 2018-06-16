/**
 * An object which represents an OpenGL program object.
 *
 * @author Tyler Bucher
 */
export default class Program {

    /**
     * @param {WebGLRenderingContext} glInstance the WebGL context for rendering.
     */
    constructor(glInstance) {
        this.nativeProgram = glInstance.createProgram();
    }

    /**
     * @param {WebGLRenderingContext} glInstance the WebGL context for rendering.
     * @param {Shader} shader the shader object to attach.
     */
    attachShader(glInstance, shader) {
        glInstance.attachShader(this.nativeProgram, shader.nativeShader);
    }

    /**
     * @param {WebGLRenderingContext} glInstance the WebGL context for rendering.
     * @param {Shader} shader the shader object to detach.
     */
    detachShader(glInstance, shader) {
        glInstance.detachShader(this.nativeProgram, shader.nativeShader);
    }

    /**
     * @param {WebGLRenderingContext} glInstance the WebGL context for rendering.
     */
    link(glInstance) {
        glInstance.linkProgram(this.nativeProgram);
    }

    /**
     * @param {WebGLRenderingContext} glInstance the WebGL context for rendering.
     */
    validate(glInstance) {
        glInstance.validateProgram(this.nativeProgram);
    }

    /**
     * @param {WebGLRenderingContext} glInstance the WebGL context for rendering.
     *
     * @return {boolean} true if the shader objects were successfully linked false otherwise.
     */
    verify(glInstance) {
        return glInstance.getProgramParameter(this.nativeProgram, glInstance.LINK_STATUS);
    }
}