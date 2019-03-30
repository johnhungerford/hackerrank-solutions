/**
 * Returns the numbers of "valleys" in an array of 'U' and 'D' characters, representing
 * an upward step and downward step, respectively. A valley is defined as any sequence of steps
 * that begin downward from the original elevation and return to original elevation. Assumes
 * that the array begins and ends on the same elevation.
 * @param {integer} n  Number of steps
 * @param {array}   s  Array of characters, assumed to consist only of 'U' and 'D'
 * @return {integer} The number of valleys
 */
 function countingValleys(n, s) {
    let valleys = 0;
    let height = 0;
    for (let i = 0; i < n; i++) {
        if (s[i] === 'D') {
            if (height === 0) valleys += 1;
            height -= 1;
        } else {
            height += 1;
        }
    }

    return valleys;
}
