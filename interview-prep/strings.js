/**
 * Determines the minimum number of characters that must be deleted from two strings
 * in order to make them anagrams of each other (i.e., be rearrangeable to produce
 * each other). Uses frequency map.
 * @param   {string}  a  First string
 * @param   {string}  b  Second string, to compare with first
 * @return  {integer}    Minimum number of characters to be deleted from a, b, or both
 *                       so that they are anagrams
 */
function makeAnagram(a, b) {
    const am = {}, bm = {};
    let n = 0;
    for (let i = 0; i < a.length; i++) {
        if (am.hasOwnProperty(a[i])) {
            am[a[i]] += 1;
        } else {
            am[a[i]] = 1;
        }
    }

    for (let i = 0; i < b.length; i++) {
        if (bm.hasOwnProperty(b[i])) {
            bm[b[i]] += 1;
        } else {
            bm[b[i]] = 1;
        }
    }

    for (let i in am) {
        if (!am.hasOwnProperty(i)) continue;
        if (!bm.hasOwnProperty(i)) {
            n += am[i];
            continue;
        }

        if (am[i] > bm[i]) {
            n += am[i] - bm[i];
        } else {
            n += bm[i] - am[i];
        }
    }

    for (let i in bm) {
        if (!bm.hasOwnProperty(i)) continue;
        if (!am.hasOwnProperty(i)) {
            n += bm[i];
            continue;
        }
    }

    return n;
}

/**
 * Calculates minimum number of deletions on a string consisting only of 'A's and 'B's such
 * that the resulting string has no matching adjacent characters. 
 * @param  {string}  s  String of 'A's and 'B's
 * @return {integer}    Number of single-character deletions on s so that there are no adjacent
 *                      matching characters.
 */
function alternatingCharacters(s) {
    let n = 1;
    let a = s[0];

    // Count the number of transitions from one character to the other, ignoring the first character,
    // which should not be deleted even if all others are (hence n starts at 1)
    for (let i = 1; i < s.length; i++) {
        if (s[i] != s[i - 1]) n += 1;
    }

    // The number of deletions will be the total number of characters less the number of times there is
    // a transition.
    return s.length - n;
}

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

