/**
 * Find the smallest difference that can be found between any two integers in an array. Sorts
 * array in ascending order, and finds minimum by crawling through.
 * @param  {array}  arr  Array of integers to be searched for minimum difference
 * @return {integer}     Smallest difference found in arr
 */
function minimumAbsoluteDifference(arr) {
    arr = mergeSort(arr);
    let min = d(arr[0], arr[1])
    for (let i = 2; i < arr.length; i++) {
        let n = d(arr[i - 1], arr[i]);
        if (n < min) min = n;
    }

    return min;

    // Function definitions
    function d(a, b) { return Math.abs(a - b); }
    function mergeSort(arrin) {
        if (arrin.length === 1) return arrin;
        if (arrin.length === 2) {
            if (arrin[0] > arrin[1]) {
                const x = arrin[0];
                arrin[0] = arrin[1];
                arrin[1] = x;
            }

            return arrin;
        }

        const mid = Math.ceil((arrin.length - 1) / 2);
        var lo = [];
        var hi = [];
        for (let i = 0; i < mid; i++) {
            lo.push(arrin[i]);
            hi.push(arrin[i + mid]);
        }

        if (2 * mid < arrin.length) hi.push(arrin[arrin.length - 1]);

        lo = mergeSort(lo);
        hi = mergeSort(hi);

        let iHi = 0;
        let iLo = 0;
        for (let i = 0; i < arrin.length; i++) {
            if (iHi >= hi.length || lo[iLo] <= hi[iHi]) {
                arrin[i] = lo[iLo];
                iLo += 1;
            } else {
                arrin[i] = hi[iHi];
                iHi += 1;
            }
        }

        return arrin;
    }
}
