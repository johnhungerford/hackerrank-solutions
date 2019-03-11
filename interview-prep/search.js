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

/**
 * Returns array mapping of binary tree after it undergoes a series of transformations: given k
 * it swaps the children of every node at depth k, 2k, 3k, 4k, etc. Array mapping is really weird:
 * starting at node left of root, map first node, explore left branches first, then right branches,
 * only map nodes once the left branch has been mapped or if it doesn't have one, but map the
 * root's right child when you first traverse it even if you haven't explored that node's left
 * branch.
 * @param    {array}  indexes   2D array with binary tree map, but in a strange format: each element
 *                            is array of two integers, a left and right child. The array at i
 *                            gives the children for node i, which are themselves given at some
 *                            earlier index j < i.
 * @param    {array}  queries   An array of integers, each of which tells you the multiples of
 *                            depths that swaps should be performed at before you map the tree.
 * @returns  {array}  2D array of each mapping performed after each swap in @param:queries. Swaps
 *                    should aggregate, i.e., be perforemd on the result of the last swap 
 */
function swapNodes(indexes, queries) {
    // Node object that binary tree is built from
    class Node {
        constructor(v, l, r, p) {
            this.v = v === undefined ? new Date().toString() : v;
            this.l = l === undefined ? null : l instanceof Node ? l : new Node(l);
            this.r = r === undefined ? null : r instanceof Node ? r : new Node(r);
            this.p = p === undefined ? null : p instanceof Node ? p : new Node(p);
            if (l instanceof Node && l.d !== undefined) {
                this.d = l.d - 1;
            } else if (r instanceof Node && r.d !== undefined) {
                this.d = r.d - 1;
            } else if (p instanceof Node && p.d !== undefined) {
                this.d = p.d + 1;
            } else {
                this.d = 1;
            }
        }

        // Necessary to use Node instance as a key
        toString() { return this.v; }
        addL(v, l, r) { this.l = new Node(v, l, r, this); }
        addR(v, l, r) { this.r = new Node(v, l, r, this); }
        swapChildren() {
            console.log(`Swapping children on ${this.v}`);
            let x = this.l;
            this.l = this.r;
            this.r = x;
        }

        getNext(min) {
            console.log(`getNext(): starting from ${this.v}`);
            var m = min === undefined ? {} : min;
            let ptr = this;
            // It is root's right child and unmapped: map and stop here
            if (ptr.p !== null && ptr.p === null && !m.hasOwnProperty(ptr)) {
                m[ptr] = 1;
                return ptr;
            }

            // There is no left child or left child has been mapped
            if (ptr.l === null || m.hasOwnProperty(ptr.l)) {
                // The present one hasn't been mapped: it must be the next
                if (!m.hasOwnProperty(ptr)) {
                    console.log(`Unmapped node with no unexplored children: ${ptr}`);
                    m[ptr] = 1;
                    return ptr;
                }

                // There is an unexplored right branch: find next in there
                if (ptr.r !== null && !m.hasOwnProperty(ptr.r)) {
                    console.log(`Unexplored right branch. Descending from ${ptr}`);
                    return ptr.r.getNext(m);
                }

                // No left child
                while (true) {
                    process.stdout.write(`Climbing up from: ${ptr.v}`);
                    ptr = ptr.p;
                    if (ptr === null) return false;
                    if (m.hasOwnProperty(ptr)) return ptr.getNext(m);
                    console.log(`to ${ptr.v}`);
                    m[ptr] = 1;
                    return ptr;
                }
            }

            // There is unexplored left branch, go to it, and return next
            process.stdout.write(`Unexplored left branch. Descending from ${ptr}`);
            return ptr.l.getNext(m);
        }

        mapTree() {
            // Find left-most node, by going to root, and then maximum left child
            let ptr = this;
            // Find root
            while (ptr.p !== null) ptr = ptr.p;
            // Find left-most child
            while (ptr.l !== null) ptr = ptr.l;
            // Explore tree starting from left-most side        
            const a = [];
            const m = {};
            a.push(ptr.v);
            m[ptr] = 1;
            while (true) {
                ptr = ptr.getNext(m);
                if (ptr === false) break;
                a.push(ptr.v);
            }
            console.log(a);
            return a;
        }
    }

    // Build tree from @param:indexes and map depth to nodes
    let root = new Node(1);
    let map = [root];
    let dmap = [null, [root]];
    for (let i = 0; i < indexes.length; i++) {
        let ptr = map[i];
        if (indexes[i][0] != -1) {
            ptr.addL(indexes[i][0]);
            map.push(ptr.l);
            if (dmap[ptr.l.d] === undefined) {
                dmap[ptr.l.d] = [ptr.l];
            } else {
                dmap[ptr.l.d].push(ptr.l);
            }
        }

        if (indexes[i][1] != -1) {
            ptr.addR(indexes[i][1]);
            map.push(ptr.r);
            if (dmap[ptr.r.d] === undefined) {
                dmap[ptr.r.d] = [ptr.r];
            } else {
                dmap[ptr.r.d].push(ptr.r);
            }
        }
    }

    // Perform swaps from @param:queries and map tree onto out
    const out = [];
    for (let i = 0; i < queries.length; i++) {
        let k = queries[i];
        let ctr = k;
        while (dmap[ctr] !== undefined) {
            const a = [];
            for (let j = 0; j < dmap[ctr].length; j++) {
                dmap[ctr][j].swapChildren();
            }

            ctr += k;
        }
        out.push(root.mapTree());
    }

    return out;
}

/**
 * Finds the number of pairs of integers in an array that have a given difference
 * @param   {integer} k    The difference to be searched for
 * @param   {array}   arr  The array to search for the pairs with difference k
 * @returns {integer} The number of pairs of integers in arr with a difference of k
 */
function pairs(k, arr) {
    let map = {};
    for (let i = 0; i < arr.length; i++) {
        map[arr[i]] = true;
    }

    let n = 0;
    for (let i = 0; i < arr.length; i++) {
        if (map[arr[i] + k]) n += 1;
    }

    return n;
}

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

/**
 * Finds the number of days required to produce a given number of items using an array of machines,
 * each of which takes a certain number of days to produce one item. This algorithm has function
 * that calculates the number of items after a given day, and uses a binary search to find the
 * earliest day on which the given number of items is produced
 * @param {array}   machines   An array of integers describing how many days it takes each machine
 *                             to produce one item. Can contain duplicates.
 * @param {integer} goal       How many items to be produced
 * @returns {integer}          The minimum number of days that {machines} take to produce {goal} items
 */
function minTime(machines, goal) {
    // Get frequency map of machines. We can calculate how many items are produced after a given number
    // of days by multiplying the number that one machine produces by its frequency.
    let map = {};
    for (let i = 0; i < machines.length; i++)
        map[machines[i]] = map.hasOwnProperty(machines[i]) ? map[machines[i]] + 1 : 1; 

    // Turn the above frequency map into a sorted array
    let amap = [];
    for (let k in map) amap.push([k, map[k]]);
    amap = sort(amap);

    // Remove all the machines that will not contribute to the goal (will take longer to produce one
    // item than it takes the quickest machine to produce all the items)
    let max = goal * amap[0][0] * amap[0][1];
    for (let i = amap.length - 1; i < 0; i--) {
        if (amap[i][0] >= max) {
            amap.pop();
        } else {
            break;
        }
    }
    
    // Find the earliest day on which {goal} items are produced. Upper bound is the number of days
    // it takes for the quickest machine to reach the goal by itself.
    let d = binarySearch(goal, 1, max, getProducts);
    return d;

    // Function to calculate the number produces produced by the end of a given day x
    function getProducts(x) {
        let p = 0;
        for (let i in amap) p += amap[i][1] * Math.floor(x / parseInt(amap[i][0]));
        return p;
    }

    /**
     * This version of binarySearch searches for the lowest integer input of a function that
     * will result in or exceed a given value. Only works if fn's slope is always positive or zero.
     * @param {integer}  n   The value of fn being searched for
     * @param {integer}  lo  The lowest integer input of fn to consider
     * @param {integer}  hi  The highest integer input of fn to consider
     * @param {function} fn  A function
     * @returns {integer}  The smallest integer i such that fn(i) >= n
     */
    function binarySearch(n, lo, hi, fn) {
        let lov = fn(lo);
        let hiv = fn(hi);
        if (lov >= n) return lo;
        if (hiv === n) if (fn(hi - 1) != hiv) return hi;
        if (hiv < n) return null;
        if (hi - lo === 1) return hi;
        let mi = Math.floor((lo + hi) / 2);
        let miv = fn(mi);
        return miv < n ? binarySearch(n, mi, hi, fn) : binarySearch(n, lo, mi, fn);
    }

    // Merge sort algorithm
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