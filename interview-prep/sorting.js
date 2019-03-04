/**
 * Performs a bubble sort on an array of integers, and prints 1) the number of
 * swaps performed, 2) the first element of the sorted array, and 3) the last
 * element of the sorted array
 * @param {arra} a  The array to be sorted
 */
function countSwaps(a) {
    function swap(x,y) {
        let z = a[y];
        a[y] = a[x];
        a[x] = z;
    }

    let n = 0;
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - 1; j++) {
            // Swap adjacent elements if they are in decreasing order
            if (a[j] > a[j + 1]) {
                swap(j, j + 1);
                n += 1;
            }
        }
    }

    process.stdout.write('Array is sorted in '+n+' swaps.\n');
    process.stdout.write('First Element: ' + a[0] +'\n');
    process.stdout.write('Last Element: '+a[a.length-1]+'\n');
}

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