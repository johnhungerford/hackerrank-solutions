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

/**
 * Determine how much luck you will have after some number of contests, where each contest
 * will either add a certain amount of luck if you lose or subtract a certain amount of luck if you
 * lose, and you can only lose a given number (k) of important contests.
 * @param  {integer}  k			Number of contests you are allowed to lose
 * @param  {array}	  contests	2D array storing information about contests where:
 *								 - contests[i][0] is the amount of luck, and
 *								 - contests[i][1] is 1 if important, or 0 if unimportant
 * @return {integer}			The amount of luck you have after all the contests
 */
function luckBalance(k, contests) {
    let important = [];
    let luck = 0;
    for (let i = 0; i < contests.length; i++) {
        if (contests[i][1] === 0) {
            luck += contests[i][0];
            continue;
        }

        important.push(contests[i][0]);
    }

    important = mergeSort(important);
    for (let i = important.length - 1; i >= important.length - k && i >= 0; i--) {
        luck += important[i];
    }

    for (let i = important.length - k - 1; i >= 0; i--) {
        luck -= important[i];
    }
    
    return luck;
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

/**
 * Given an array of stick lengths, finds the triangle with the greatest perimeter that can be
 * constructed from those sticks. If two have equal perimeters, the one whose longest side is
 * greatest is preferred; if long sides are equal, the one whose smallest side is greatest is
 * preferred. No preference beyond these restrictions.
 * @param  {array}  sticks  Array of stick lengths
 * @return {array}          Array containing the winning stick lengths, in ascending order
 */
function maximumPerimeterTriangle(sticks) {
    sticks = mergeSort(sticks);
    let max = 2;
    let winner;
    for (let i = sticks.length - 1; i >= 0; i--) {
        for (let j = i - 1; j >= 0; j--) {
            for (let k = j - 1; k >= 0; k--) {
                let perim = sum(k, j, i);
                if (perim > max) {
                    max = perim;
                    winner = [sticks[k], sticks[j], sticks[i]];
                } else if (perim === max) {
                    if (i > winner[2] || (i === winner[2] && k > winner[0])) {
                        winner = [sticks[k], sticks[j], sticks[i]];
                    }
                }
            }
        }
    }

    if (max < 3) return [-1];
    return winner;

    function sum(a, b, c) {
        return sticks[c] >= sticks[a] + sticks[b] ? 0: sticks[a] + sticks[b] + sticks[c];
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
