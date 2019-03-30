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
