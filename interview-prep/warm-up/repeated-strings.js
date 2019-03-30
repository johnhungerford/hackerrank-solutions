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
