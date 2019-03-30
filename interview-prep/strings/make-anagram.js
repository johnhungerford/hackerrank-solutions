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
