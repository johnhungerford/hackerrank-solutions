/**
 * Identifies the original string used to generate a given string by 1) copying it in reverse,
 * 2) shuffling the original, and 3) merging the reversed and the shuffled strings. Returns the
 * lexicographically smallest string that can produce the given result.
 * @param  {string}  s  Resultant string of the above operations
 * @return {string}     Lexicographically lowest string that could produce s
 */
function reverseShuffleMerge(s) {
    // Initialize output string and its maximum length
    let n = s.length / 2;
    let out = '';
    // Create frequency map of characters in s, and divide by 2 to get max c for out
    let map = {};
    for (let i = 0; i < s.length; i++) map[s[i]] = map.hasOwnProperty(s[i]) ? map[s[i]] + 1 : 1;
    for (let k in map) map[k] = map[k] / 2;

    let lmap = {};          // keep track of how many of each characters we skip
    let outmap = {};        // frequency map of output string as its generated
    let last = s.length;    // keep track of where last character added to out was in s (index)
    let lctr = last;        // where we last ran out of characters to skip in s (index)
    // Main loop: each iteration adds a character from s to out
    while (out.length < n) {
        let min = 'z';
        // Secondary loop: works way backward through s, looking for next character to add
        for (let i = last - 1; i >= 0; i--) {
            let br = false;
            // Build local frequency map; only add values when we get past our last stopping point
            if (s[i] < min && (!outmap.hasOwnProperty(s[i]) || outmap[s[i]] < map[s[i]]))
                min = s[i];
            if (i < lctr) {
                lmap[s[i]] = lmap.hasOwnProperty(s[i]) ? lmap[s[i]] + 1 : 1;
                lctr = i;
            }

            // Stop when the number of a given character we have skipped exceeds the max
            if (lmap[s[i]] > map[s[i]] && i <= lctr) {
                // Tertiary loop: find the lowest character from earlier; add to out
                for (let j = last - 1; j >= i; j--) {                    
                    if (s[j] === min) {
                        out += s[j];
                        lmap[s[j]] -= 1;
                        outmap[s[j]] = outmap.hasOwnProperty(s[j]) ? outmap[s[j]] += 1 : 1;
                        last = j;
                        br = true; // escapes the secondary loop, to continue main loop
                        break;
                    }
                }
            }

            if (br) break;
        }
    }

    return out;
}
