/**
 * Finds the highest value in an array of zeros that have been incremented according
 * to rules encoded in a 2D array, each of which includes the starting element to increment,
 * the last element to increment, and the amount to increment by. The challenge
 * is doing so for very a very large array of zeros and very long array of sum rules.
 * @param {integer} n        Number of elements in the array to be summed
 * @param {array}   queries  Array containing rules, each of which is an array of length 3
 * @return {integer} Maximum value in the summed array, after all rules applied.
 */
function arrayManipulation(n, queries) {
    let arr = [];
    for (let i = 0; i < n; i++) arr.push(0);

    for (let i = 0; i < queries.length; i++) {
        arr[queries[i][0] - 1] += queries[i][2];
        if (queries[i][1] < n) arr[queries[i][1]] -= queries[i][2];
    }

    let maxval = 0;
    let x = 0;
    for (let i = 0; i < arr.length; i++) {
        x += arr[i];
        if (x > maxval) maxval = x;
    }

    return maxval;
}
