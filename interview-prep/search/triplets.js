/**
 * Calculate the number of unique triplets (p, q, r) in arrays a, b, c, respectively, such that
 * p and r are less than or equal to q. Sorts arrays, removes duplicates, and then iterates through
 * unique values of q in b, using a binary search to find the highest possible values less than
 * or equal to q in a and c. The number of triplets for each value of q is the product of the
 * numbers of elements in a and c less than or equal to q.
 * @param {array} a 
 * @param {array} b 
 * @param {array} c 
 * @returns {integer} Number of unique triplets
 */
function triplets(a, b, c) {
    a = mergeSort(a);
    b = mergeSort(b);
    c = mergeSort(c);

    // Remove duplicates from each array in close to one pass
    let len = a.length > c.length ? a.length : c.length;
    len = b.length > len ? b.length : len;
    let actr = 0, cctr = 0, bctr = 0;
    for (let i = 0; i < len; i++) {
        if (a[i] !== undefined) a[actr] = a[i];
        if (c[i] !== undefined) c[cctr] = c[i];
        if (b[i] !== undefined) b[bctr] = b[i];
        if (a[i + 1] !== undefined) actr += a[i] === a[i + 1] ? 0 : 1;
        if (c[i + 1] !== undefined) cctr += c[i] === c[i + 1] ? 0 : 1;
        if (b[i + 1] !== undefined) bctr += b[i] === b[i + 1] ? 0 : 1;
    }

    let ctr = actr < cctr ? actr : cctr;
    ctr = bctr < ctr ? bctr : ctr;
    for (let i = len - 1; i > ctr; i--) {
        if (i < a.length && i > actr) a.pop();
        if (i < c.length && i > cctr) c.pop();
        if (i < b.length && i > bctr) b.pop();
    }

    let n = 0;
    for (let i = 0; i < b.length; i++) {
        let q = b[i];
        let pMax = binarySearch(a, q, 0, a.length);
        let rMax = binarySearch(c, q, 0, c.length);
        let pn = pMax === null ? 0 : pMax + 1;
        let rn = rMax === null ? 0 : rMax + 1;
        n += pn * rn;
    }

    return n;
    function binarySearch(a, n, lo, hi) {
        if (lo === hi) return lo <= n ? lo : null;
        if (a[lo] > n) return null;
        if (a[hi] <= n) return hi;
        if (hi - lo === 1) return lo;
        let mi = Math.floor((lo + hi) / 2);
        if (a[mi] < n) return binarySearch(a, n, mi, hi);
        return binarySearch(a, n, lo, mi);
    }

    function mergeSort(arr) {
        if (arr.length === 1) return arr;
        let n, a;
        for (n = 0, a = 1; a < arr.length; a = 2 * a, n += 1);
        for (let i = 0, j = 1; i <= n; i++ , j = 2 * j) {
            for (let k = 0; k + j < arr.length; k += 2 * j) {
                const a = [];
                let iLo = 0, iHi = k + j;
                for (let l = k; l < k + 2 * j && l < arr.length; l++) {
                    let loval = iLo >= a.length ? arr[l] : a[iLo];
                    if (iHi > l) {
                        if (iHi >= k + (2 * j) || iHi >= arr.length || loval <= arr[iHi]) {
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
