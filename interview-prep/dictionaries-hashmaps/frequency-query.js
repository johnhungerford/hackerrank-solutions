/**
 * Responds to a series of queries, each of which can 1) add an element to a data
 * structure, 2) delete an element from a data structure, or 3) ask whether there are
 * an elements with a given frequency in the data structure
 * @param {array}  queries   2D array where arr[i] = [q,x], where q is 1,2, or 3 (see above)
 *							 and x is either the element to be added/deleted (q=1,2) or
 *							 the frequency to be tested (q=3)
 * @return {array} An array of outputs (generated only by q=3), which can be '1' or '0'
 */
function freqQuery(queries) {
    let map = {};
    let fmap = {};
    let output = [];

    for (let i = 0; i < queries.length; i++) {
        let x = queries[i][1];
        switch (queries[i][0]) {
            case 1:
                if (map[x] === undefined) {
                    map[x] = 1;
                } else {
                    map[x] += 1;
                }

                fmap[map[x] - 1] -= 1;
                if (fmap[map[x]] === undefined) {
                    fmap[map[x]] = 1;
                } else {
                    fmap[map[x]] += 1;
                }
                continue;
            case 2:
                if (map[x] === undefined || map[x] < 1) continue;
                map[x] -= 1;
                fmap[map[x] + 1] -= 1;
                fmap[map[x]] += 1;
                continue;
            case 3:
                if (fmap[x] === undefined || fmap[x] < 1) {
                    output.push('0');
                    continue;
                }

                output.push('1');
                continue;
        }
    }

    return output;
}
