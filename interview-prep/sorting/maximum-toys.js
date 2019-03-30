/**
 * Calculates the number of items one could purchase with a given budget from an array
 * of items of different prices. Uses a merge sort to put the list in ascending order,
 * and adds up prices until the budget is reached.
 * @param  {array}   prices  Array of prices, each corresponding to a single item
 * @param  {integer} max     budget for purchasing: maximum amount to spend on 'prices'
 * @return {intever}         Maximum number of elements that can be purchased from 'prices'
 */
function maximumToys(prices, max) {
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
            if (iHi >= hi.length || lo[iLo] < hi[iHi]) {
                arrin[i] = lo[iLo];
                iLo += 1;
            } else {
                arrin[i] = hi[iHi];
                iHi += 1;
            }
        }

        return arrin;
    }

    prices = mergeSort(prices);

    let spent = 0;
    let n = 0;
    for (let i = 0; i < prices.length; i++) {
        if (spent + prices[i] > max) break;
        spent += prices[i];
        n += 1;
    }

    return n;
}
