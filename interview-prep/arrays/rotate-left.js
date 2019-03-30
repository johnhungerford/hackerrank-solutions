/**
 * Rotates an array left a given number of times
 * @param {array}   a  Array to be rotated
 * @param {integer} d  Number of rotations
 * @return {array} Rotated array
 */
function rotLeft(a, d) {
    Array.prototype.push.apply(a, a.splice(0, d));
    return a;
}
