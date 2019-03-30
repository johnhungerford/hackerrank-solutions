/**
 * Determine the longest "child" string common to two strings. A child is any string that can be
 * produced by deleting 0 or more characters of the parent string. This is otherwise known as the
 * "longest common sequence" problem. It works by employing a recursive algorithm in reverse,
 * storing results in a 2D array.
 * @param  {string}  s1, s2  The strings to be searched for common childs
 * @return {integer}         Length of the largest common child
 */
function commonChild(s1, s2) {
    // Make a 2D array filled with solutions for substrings s1[0...s1.length] and s2[0...s2.length]
    // where c[0][i] and c[j][0] are the solutions for non-existent substrings s1[s1.length] and
    // s2[s2.length], which can be initialized to 0 (no common child for non-existent substrings...)
    let c = [];
    for (let i = 0; i <= s1.length; i++) {
        c.push([0]);
        c[i].push(0);
    }

    // get solution c[i][j] by reference to c[i-1][j], c[i][j-1], or c[i-1][j-1]
    for (let i = 1; i <= s1.length; i++) {
        c[i][0] = 0;
        for (let j = 1; j <= s1.length; j++) {
            if (s1[i - 1] === s2[j - 1]) {
                c[i][j] = 1 + c[i - 1][j - 1];
                continue;
            }

            c[i][j] = c[i - 1][j] >= c[i][j - 1] ? c[i - 1][j] : c[i][j - 1];
        }
    }

    return c[c.length - 1][c[c.length - 1].length - 1];
}
