/**
 * Finds the number of pairs of integers in an array that have a given difference
 * @param   {integer} k    The difference to be searched for
 * @param   {array}   arr  The array to search for the pairs with difference k
 * @returns {integer} The number of pairs of integers in arr with a difference of k
 */
function pairs(k, arr) {
    let map = {};
    for (let i = 0; i < arr.length; i++) {
        map[arr[i]] = true;
    }

    let n = 0;
    for (let i = 0; i < arr.length; i++) {
        if (map[arr[i] + k]) n += 1;
    }

    return n;
}
