/**
 * Finds the number of days required to produce a given number of items using an array of machines,
 * each of which takes a certain number of days to produce one item. This algorithm has function
 * that calculates the number of items after a given day, and uses a binary search to find the
 * earliest day on which the given number of items is produced
 * @param {array}   machines   An array of integers describing how many days it takes each machine
 *                             to produce one item. Can contain duplicates.
 * @param {integer} goal       How many items to be produced
 * @returns {integer}          The minimum number of days that {machines} take to produce {goal} items
 */
function minTime(machines, goal) {
    // Get frequency map of machines. We can calculate how many items are produced after a given number
    // of days by multiplying the number that one machine produces by its frequency.
    let map = {};
    for (let i = 0; i < machines.length; i++)
        map[machines[i]] = map.hasOwnProperty(machines[i]) ? map[machines[i]] + 1 : 1; 

    // Turn the above frequency map into a sorted array
    let amap = [];
    for (let k in map) amap.push([k, map[k]]);
    amap = sort(amap);

    // Remove all the machines that will not contribute to the goal (will take longer to produce one
    // item than it takes the quickest machine to produce all the items)
    let max = goal * amap[0][0] * amap[0][1];
    for (let i = amap.length - 1; i < 0; i--) {
        if (amap[i][0] >= max) {
            amap.pop();
        } else {
            break;
        }
    }
    
    // Find the earliest day on which {goal} items are produced. Upper bound is the number of days
    // it takes for the quickest machine to reach the goal by itself.
    let d = binarySearch(goal, 1, max, getProducts);
    return d;

    // Function to calculate the number produces produced by the end of a given day x
    function getProducts(x) {
        let p = 0;
        for (let i in amap) p += amap[i][1] * Math.floor(x / parseInt(amap[i][0]));
        return p;
    }

    /**
     * This version of binarySearch searches for the lowest integer input of a function that
     * will result in or exceed a given value. Only works if fn's slope is always positive or zero.
     * @param {integer}  n   The value of fn being searched for
     * @param {integer}  lo  The lowest integer input of fn to consider
     * @param {integer}  hi  The highest integer input of fn to consider
     * @param {function} fn  A function
     * @returns {integer}  The smallest integer i such that fn(i) >= n
     */
    function binarySearch(n, lo, hi, fn) {
        let lov = fn(lo);
        let hiv = fn(hi);
        if (lov >= n) return lo;
        if (hiv === n) if (fn(hi - 1) != hiv) return hi;
        if (hiv < n) return null;
        if (hi - lo === 1) return hi;
        let mi = Math.floor((lo + hi) / 2);
        let miv = fn(mi);
        return miv < n ? binarySearch(n, mi, hi, fn) : binarySearch(n, lo, mi, fn);
    }

    // Merge sort algorithm
    function sort(arr) {
        if (arr.length === 1) return arr;
        let n, a;
        for (n = 0, a = 1; a < arr.length; a = 2 * a, n += 1);
        for (let i = 0, j = 1; i <= n; i++ , j = 2 * j) {
            for (let k = 0; k + j < arr.length; k += 2 * j) {
                const a = [];
                let iLo = 0, iHi = k + j;
                for (let l = k; l < k + 2 * j && l < arr.length; l++) {
                    let loval = iLo >= a.length ? arr[l][0] : a[iLo][0];
                    if (iHi > l) {
                        if (iHi >= k + (2 * j) || iHi >= arr.length || loval <= arr[iHi][0]) {
                            if (iLo >= a.length) continue;
                            a.push(arr[l]);
                            arr[l] = a[iLo];
                            iLo += 1;
                            continue
                        }
                    }
                    a.push(arr[l]);
                    arr[l] = arr[iHi];
                    iHi += 1;
                }
            }
        }
        return arr;
    }
}
