/**
 * Calculate the number of 'special palindromes' in a string, where a 'special palindrome'
 * is any substring that has either 1) all the same characters OR 2) all the same characters
 * except for the central character (applies only to odd-length substrings).
 * @param  {integer}  n   The length of the string
 * @param  {string}   s   String to be tested for special palindromes.
 * @return {integer}  ct  Number of 'special palindrome' substrings in s
 */
function substrCount(n, s) {
    Array.prototype.last = function () { return this[this.length - 1]; }
    let ct = 0;
    let map = [];
    let i = 0;
    while (i < s.length) {
        map.push([s[i], 1]);
        while (s[i] === s[i + 1]) {
            map.last()[1] += 1;
            i += 1;
        }

        // Count the number of possible substrings in this series of identical
        // characters
        for (let j = 0; j < map.last()[1]; j++) ct += map.last()[1] - j;
        i += 1;
    }

    if (map.length > 2) {
        for (let i = 0; i < map.length - 2; i++) {
            if (map[i][0] === map[i + 2][0] && map[i + 1][1] === 1) {
                ct += map[i][1] > map[i + 2][1] ? map[i + 2][1] : map[i][1];
            }
        }
    }
    
    return ct;
}
