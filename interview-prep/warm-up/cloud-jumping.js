/**
 * Returns the minimum number of jumps it takes to get to the end of an array of
 * 1s and 0s, where the 1s must be avoided, and you can only jump one or two spaces.
 * @param {array} c 
 * @return {integer} Minimum number of jumps
 */
function jumpingOnClouds(c) {
    console.log(c);
    if (c.length === 1) return 0;

    if (c.length <= 3) return 1;

    if (c[1] === 1) return 1 + jumpingOnClouds(c.slice(2, c.length));
    
    if (c[2] === 1) return 1 + jumpingOnClouds(c.slice(1, c.length));

    const a = jumpingOnClouds(c.slice(1, c.length));
    const b = jumpingOnClouds(c.slice(2, c.length));
    if (a < b) return 1 + a;

    return 1 + b;
}
