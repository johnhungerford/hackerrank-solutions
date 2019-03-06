/**
 * Finds two flavors on a menu of priced flavors that you can afford exactly with a given budget
 * @param   {array}   cost    array of prices of flavors (disordered) 
 * @param   {integer} money   amount of money to spend
 * @returns  nothing          Prints the 1-based index of the two prices in cost in ascending order
 */
function whatFlavors(cost, money) {
    for (let i = 0; i < cost.length; i++) cost[i] = [cost[i], i + 1];
    cost = sort(cost);
    let top = binarySearch(cost, money, 0, cost.length - 1);
    let mid = binarySearch(cost, Math.ceil(money / 2), 0, top);
    for (let i = mid; i <= top; i++) {
        for (let j = i - 1; j >= 0; j--) {
            if (cost[i][0] + cost[j][0] < money) break;
            if (cost[i][0] + cost[j][0] === money) {
                if (cost[i][1] <= cost[j][1]) {
                    process.stdout.write(`${cost[i][1]} ${cost[j][1]}\n`);
                } else {
                    process.stdout.write(`${cost[j][1]} ${cost[i][1]}\n`);
                }

                return;
            } 
        }
    }

    /**
     * Performs a recursive binary search for the highest element in a that is less than n
     * @param   {array}   a   Array to be searched
     * @param   {integer} n   Value found should be the highest less than this
     * @param   {integer} lo  lower bound of search (inclusive)
     * @param   {integer} hi  upper bound of search (inclusive)
     * @returns {integer} index of greatest element in a that is less than n; null if none exists
     */
    function binarySearch(a, n, lo, hi) {
        if (lo === hi) return a[lo][0] >= n ? null : lo;
        if (a[lo][0] >= n) return null;
        if (a[hi][0] <= n) return a[hi] === n ? hi - 1 : hi;
        if (hi - lo === 1) return lo;
        let mi = Math.floor((lo + hi) / 2);
        if (a[mi][0] < n) return binarySearch(a, n, mi, hi);
        return binarySearch(a, n, lo, mi);
    }

    // Merge sort, modified to take into account that the input array maps integers to indices
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
