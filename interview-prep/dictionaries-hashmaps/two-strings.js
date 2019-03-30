/**
 * Determines whether two strings share a common substring, which can be as
 * small as a single character. (Essentially means seeing whether two strings
 * have any character in common.)
 * @param  {string}  s1  A string
 * @param  {string}  s2  Second string to compare with s1
 * @return {string} 	 'YES' if they have common substring; 'NO' if they don't
 */
function twoStrings(s1, s2) {
    let sMap = {};
    let sBig = [];
    let sSmall = [];
    if (s1.length >= s2.length) {
        sBig = s1;
        sSmall = s2;
    } else {
        sBig = s2;
        sSmall = s1;
    }

    for (let i = 0; i < sSmall.length; i++) sMap[sSmall[i]] = true;

    for (let i = 0; i < sBig.length; i++) if (sMap[sBig[i]]) return 'YES';

    return 'NO'
}
