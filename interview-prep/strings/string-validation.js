/**
 * Determines validity of a string, where it is valid if 1) all characters appear the same number
 * of times OR 2) only 1 character must be deleted from the string to meet criterion #1.
 * @param  {string} s  The string to be checked
 * @return {string}    'YES' if s is valid and 'NO' if s is invalid according to above rules
 */
function isValid(s) {
    // Make a map of the frequency of all characters in the string
    let map = {};
    for (let i = 0; i < s.length; i++) {
        if (map.hasOwnProperty(s[i])) {
            map[s[i]] += 1;
        } else {
            map[s[i]] = 1;
        }
    }

    // Make a map of the frequency of all the different frequencies
    // found in the original map above
    let mmap = {};
    for (let c in map) {
        if (mmap.hasOwnProperty(map[c])) {
            mmap[map[c]] += 1;
        } else {
            mmap[map[c]] = 1;
        }
    }

    // Get the first two frequencies in mmap: if there are more
    // than two frequencies, the string is a 'NO'
    let n = 0;
    let f1 = [], f2 = [];
    for (let f in mmap) {
        if (!mmap.hasOwnProperty(f)) continue;
        if (n === 0) f1 = [f, mmap[f]];
        if (n === 1) f2 = [f, mmap[f]];
        if (n > 1) return 'NO';
        n += 1;
    }

    // There can only be one character with an exceptional frequency
    if (f1[1] > 1 && f2[1] > 1) return 'NO';
    // It is okay if the divergent frequency is only a single character or
    // if the divergent frequency is only different by a single character
    if (f1[0] === 1 || f2[0] === 1 || Math.abs(f2[0] - f1[0]) === 1) return 'YES';
    return 'NO';
}
