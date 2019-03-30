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
