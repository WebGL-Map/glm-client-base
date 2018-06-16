/**
 * A class to holder helper functions for the GLM client.
 *
 * @author Tyler Bucher
 */
export default class Util {

    /**
     * Checks to see the value string is an ipv4.
     *
     * @param {String} value the potential ipv4 string.
     *
     * @returns {boolean} true if the string is an ipv4 false otherwise.
     */
    static ipv4Check(value) {
        // Make sure there are four numbers
        let val = value.split('.').filter(Boolean);
        if (val.length < 4) {
            return false;
        }
        // Check if all four values are in the 0 to 255 range
        for (let i = 0; i < val.length; i++) {
            if (!Util.rangeCheck(parseInt(val[i], 10), 0, 255)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Checks to see if a value is in between two other values.
     *
     * @param {number} val the value to check.
     * @param {number} start the lower range.
     * @param {number} end the upper range.
     *
     * @returns {boolean} true if the value is in between the upper and lower value.
     */
    static rangeCheck(val, start, end) {
        return val >= start && val <= end;
    }
}