/**
 * Counts the number of 'geometric triplets' in an array of integers, where a
 * 'geometric triplet' is three elements in an array that follow a geometric
 * progression, and whose indices are ordered the direction of the progression
 * @param {array}    arr   The array to be searched for geometric triplets
 * @param {integer}  r     The ratio of the geometric progression
 * @return {integer}       How many geometric triplets are in arr
 */
 function countTriplets(arr, r) {
    // oneMap tells how many elements are one step behind any given value in the array
    const oneMap = {};
    // twoMap tells how many ordered pairs of elements are behind a given value
    const twoMap = {};
    let num = 0;
    // Cycle through all of the elements in the array
    for (let i = 0; i < arr.length; i++) {
        let product = r * arr[i];

        // We can add however many ordered pairs are behind this value to the count, since
        // each will combine with this value to form a triplet
        num += twoMap.hasOwnProperty(arr[i]) ? twoMap[arr[i]] : 0;

        // We can increment the twoMap for the next in the progression by however many
        // are given by the oneMap for the present value
        if (oneMap[arr[i]] !== undefined) {
            if (twoMap[product] === undefined) {
                twoMap[product] = oneMap[arr[i]];
            } else {
                twoMap[product] += oneMap[arr[i]];
            }
        }

        // Finally, we can increment the oneMap for the next in the progression by one,
        // since the present value is adding exactly one more such values
        if (oneMap[product] === undefined) {
            oneMap[product] = 1;
        } else {
            oneMap[product]++;
        }
    }

    return num;
}
