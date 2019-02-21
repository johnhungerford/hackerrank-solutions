/**
 * Returns the number of pairs of socks in an array of socks of varying color
 * @param {integer} n    Number of socks in array
 * @param {array}   ar   Array of integers representing color code of sock ar[i]
 * @return {integer} Total number of pairs of integers found in ar
 */
function sockMerchant(n, ar) {
    let pairs = 0;
    while (ar.length != 0) {
        
        for (let j = 1; j < ar.length; j++) {
            if (ar[0] === ar[j]) {
                pairs += 1;
                ar.splice(j, 1);
                break;
            }
        }

        ar.splice(0, 1);
    }

    return pairs;
}

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

/**
 * Gets the number of the letter 'a' in a string composed of repetitions of another
 * base string
 * @param {string}  s  A string to repeat
 * @param {integer} n  The number of characters of the repeated string
 */
function repeatedString(s, n) {

    const r   = n % s.length;
    const sn  = (n - r)/s.length;
    let   anr = 0;
    let   ans = 0;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === 'a') {
            ans += 1;
            if(i < r) anr += 1;
        }
    }

    return anr + ans * sn;
}