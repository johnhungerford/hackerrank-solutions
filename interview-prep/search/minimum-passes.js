/**
 * Calculates what the minimum number of passes are needed for m machines and w workers to
 * produce at least n products, where the number of products produced in one pass is m * w
 * and more machines *or* workers can be bought after each pass at a price of p products per
 * machine *or* worker (they have the same price).
 * Uses the following principles:
 *      1) keeps m and w as close to each other as possible
 *      2) either buys as many machines/workers as possible or none
 *      3) decides whether to buy based on whether the new rate of production would by itself 
 *         lead to an earlier or equal end date (taking into account loss of products)
 *      4) tracks maximum number of passes (given current rate), and returns that if you
 *         can afford to buy more but doing so increases the maximum number of passes (given
 *         the new rate and the loss of products).
 * @param {number} mstart The number of machines at the beginning
 * @param {number} wstart The number of workers at the beginning
 * @param {number} p      The price per machine or worker
 * @param {number} nmin   The minimum number of products needed
 * @returns {number} The number of passes to reach or exceed target nmin
 */
function minimumPasses(mstart, wstart, p, nmin) {
    let passes = 0;
    let m = mstart, w = wstart, n = 0;
    let maxp = Math.ceil(nmin / (m * w));

    while (true) {
        const mw = m * w;
        n = n + mw;
        passes += 1;
        if (n >= nmin) return passes;
        if (n < p) {
            const diffpass = Math.ceil((p - n) / mw);
            if (passes + diffpass >= maxp) return maxp;
            n += mw * diffpass;
            passes += diffpass;
        }

        const small = m < w ? m : w;
        const large = w > m ? w : m;
        const add = Math.floor(n / p);
        let largeadd = 0;
        let smalladd = 0;
        const diff = large - small;
        if (diff >= add) smalladd = add;
        if (diff < add) {
            smalladd = diff + Math.floor((add - diff) / 2);
            largeadd = Math.ceil((add - diff) / 2);
        }

        let res = passes + Math.ceil((nmin + (p * add) - n) / ((small + smalladd) * (large + largeadd)));
        if (res <= maxp) {
            m = small + smalladd;
            w = large + largeadd;
            n = n - (add * p);
            maxp = res;
        } else {
            return maxp;
        }
    }
}
