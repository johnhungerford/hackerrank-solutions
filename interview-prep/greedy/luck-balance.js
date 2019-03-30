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
