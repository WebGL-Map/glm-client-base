export default class BiomeType {

    /**
     *
     * @param {String} id the id of the biome.
     * @param {String} name the canonical name of the biome.
     * @param {Number} humidity the biome humidity.
     * @param {Number} temperature the biome temperature.
     */
    constructor(id, name, humidity, temperature) {
        this.id          = id;
        this.name        = name;
        this.humidity    = humidity;
        this.temperature = temperature;
    }

    /**
     * @return {String} the id the of the biome.
     */
    getId() {
        return this.id;
    }

    /**
     * @return {String} the name the canonical name of the biome.
     */
    getName() {
        return this.name;
    }

    /**
     * @return {Number} the humidity of the humidity.
     */
    getHumidity() {
        return this.humidity;
    }

    /**
     * @return {Number} the temperature of the biome.
     */
    getTemperature() {
        return this.temperature;
    }
}