/**
 * Counts the number of swaps necessary to put an array of integers in ascending order,
 * where each swap must be of adjacent elements, where the low-indexed element has a higher
 * original value than the high-indexed element. Performs a merge sort and counts how many
 * such swaps *would* be needed to produce each merge.
 * @param {array}  arr  The array to be sorted
 * @return {integer}    The number of swaps of adjacent inversions needed to sort the array
 */
function countInversions(arr) {
    function mergeSortCountSwaps(arrin) {
        if (arrin.length === 1) return [arrin, 0];
        if (arrin.length === 2) {
            if (arrin[0] > arrin[1]) {
                const x = arrin[0];
                arrin[0] = arrin[1];
                arrin[1] = x;
                return [arrin, 1];
            }

            return [arrin, 0];
        }

        let n = 0;
        const mid = Math.ceil((arrin.length - 1) / 2);
        var lo = [];
        var hi = [];
        let nlo = 0;
        let nhi = 0;
        for (let i = 0; i < mid; i++) {
            lo.push(arrin[i]);
            hi.push(arrin[i + mid]);
        }

        if (2 * mid < arrin.length) hi.push(arrin[arrin.length - 1]);

        [lo, nlo] = mergeSortCountSwaps(lo);
        [hi, nhi] = mergeSortCountSwaps(hi);
        n += nlo + nhi;

        let iHi = 0;
        let iLo = 0;
        for (let i = 0; i < arrin.length; i++) {
            if (iHi >= hi.length || lo[iLo] <= hi[iHi]) {
                arrin[i] = lo[iLo];
                iLo += 1;
            } else {
                arrin[i] = hi[iHi];
                n += lo.length + iHi - i
                iHi += 1;
            }
        }

        return [arrin, n];
    }
    
    return mergeSortCountSwaps(arr)[1];
}
