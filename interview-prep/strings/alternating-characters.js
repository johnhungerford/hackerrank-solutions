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
