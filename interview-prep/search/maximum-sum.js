/**
 * Finds the maximum value that can be produced by adding all elements of any subarray of a given
 * array of positive integers and taking the remainder when that sum is divided by a given number.
 * In other words, find max sum[i,j] % m, where sum[i,j] is the sum of all elements from i to j. 
 * This algorithm uses the fact that sum[i,j] = sumall[j] - sumall[i-1], where sumall[x] is the sum
 * of all elements from index 0 to index x. It generates a sorted list (binary search tree) of these
 * "prefix sums" (sumall[x]) over the whole input array, and it greedily finds the maximum difference
 * by checking each one against the next greatest, because a modulo result minus itself brings you to
 * zero, and the *less* you subtract in *addition* to that, the higher the resulting modulo result is.
 *    *fails the three highest-n tests* (n being a.length) I think this is because of javascript...
 * @param   {array}    a  Array of positive integers
 * @param   {integer}  m  Integer that sums of {a} subarrays will be taken modulo of
 * @returns {integer}     Maximum modulo of m of all subarrays of a
 */
function maximumSum(a, m) {
    // Component nodes class of binary search tree
    class RedBlackNode {
        constructor(k, v, red, p, cmp) {
            this.k = k === undefined ? null : k;
            this.v = v === undefined ? null : [v];
            this.red = (red === true || red === false) ? red : null;
            this.p = p instanceof RedBlackNode ? p : null;
            this.cmp = cmp instanceof Function ? cmp : (a, b) => { return a > b ? 1 : a < b ? -1 : 0; };
            this.l = null;
            this.r = null;
        }
    
        // Insertion relative to this (i.e., ignores parents)
        add(k, v) {
            let ptr = this;
            while (true) {
                if (this.cmp(k, ptr.k) === 0) {
                    ptr.v.push(v);
                    return ptr;
                }
    
                if (this.cmp(k, ptr.k) === -1) {
                    if (ptr.l !== null) {
                        ptr = ptr.l;
                        continue;
                    }
    
    
                    ptr.l = new RedBlackNode(k, v, true, ptr);
                    ptr = ptr.l;
                    ptr.balance();
                    return ptr;
                }
    
                if (this.cmp(k, ptr.k) === 1) {
                    if (ptr.r !== null) {
                        ptr = ptr.r;
                        continue;
                    }
    
                    ptr.r = new RedBlackNode(k, v, true, ptr);
                    ptr = ptr.r;
                    ptr.balance();
                    return ptr;
                }
            }
        }
    
        balance() {
            let ptr = this;
            while (ptr !== null) {
                if (!ptr.red) break;
                if (ptr.p === null) {
                    ptr.red = false;
                    break;
                }
    
                if (!ptr.p.red) break;
    
                if (ptr.p.p === null) {
                    ptr.p.red = false;
                    break;
                }
    
                if ((ptr.p.p.l === ptr.p && (ptr.p.p.r === null || !ptr.p.p.r.red)) || (ptr.p.p.r === ptr.p && (ptr.p.p.l === null || !ptr.p.p.l.red))) {
                    ptr.restruct();
                    break;
                } else {
                    ptr.p.red = false;
                    ptr.p.p.r.red = false;
                    ptr.p.p.red = true;
                }
    
                ptr = ptr.p.p;
            }
        }
    
        restruct() {
            let rootParent = this.p.p.p;
            let newRoot, newChildRight, newChildLeft;
    
            // Right rotation
            if (this === this.p.l && this.p === this.p.p.l) {
                newRoot = this.p;
                newChildRight = this.p.p;
                newChildLeft = this;
                newChildRight.l = newRoot.r;
                if (newChildRight.l !== null) newChildRight.l.p = newChildRight;
            }
    
            // Left-Right Rotation
            if (this === this.p.r && this.p === this.p.p.l) {
                newRoot = this;
                newChildRight = this.p.p;
                newChildLeft = this.p;
                newChildRight.l = newRoot.r;
                if (newChildRight.l !== null) newChildRight.l.p = newChildRight;
                newChildLeft.r = newRoot.l;
                if (newChildLeft.r !== null) newChildLeft.r.p = newChildLeft;
            }
    
            // Left Rotation
            if (this === this.p.r && this.p === this.p.p.r) {
                newRoot = this.p;
                newChildLeft = this.p.p;
                newChildRight = this;
                newChildLeft.r = newRoot.l;
                if (newChildLeft.r !== null) newChildLeft.r.p = newChildLeft;
            }
    
            // Right-Left Rotation
            if (this === this.p.l && this.p === this.p.p.r) {
                newRoot = this;
                newChildLeft = this.p.p;
                newChildRight = this.p;
                newChildRight.l = newRoot.r;
                if (newChildRight.l !== null) newChildRight.l.p = newChildRight;
                newChildLeft.r = newRoot.l;
                if (newChildLeft.r !== null) newChildLeft.r.p = newChildLeft;
            }
    
            if (rootParent !== null) {
                if (rootParent.l === this.p.p) rootParent.l = newRoot;
                if (rootParent.r === this.p.p) rootParent.r = newRoot;
            }
            newRoot.p = rootParent;
    
            newRoot.r = newChildRight;
            newRoot.l = newChildLeft;
            newChildRight.p = newRoot;
            newChildLeft.p = newRoot;
            newChildRight.red = true;
            newChildLeft.red = true;
            newRoot.red = false;
        }
    
        getNext() {
            let ptr = this;
            if (ptr.r !== null) {
                ptr = ptr.r;
                while (ptr.l !== null) ptr = ptr.l;
                return ptr;
            }
    
            while (ptr !== null && this.cmp(ptr.k, this.k) !== 1) ptr = ptr.p;
            return ptr;
        }
    
        getPrev() {
            let ptr = this;
            if (ptr.l !== null) {
                ptr = ptr.l;
                while (ptr.r !== null) ptr = ptr.r;
                return ptr;
            }
    
            while (ptr !== null && this.cmp(ptr.k, this.k) !== -1) ptr = ptr.p;
            return ptr;
        }
    
        // Finds k relative to {this} (i.e., ignores parents)
        find(k) {
            let ptr = this;
            while (ptr !== null) {
                if (this.cmp(k, ptr.k) === 0) return ptr;
                if (this.cmp(k, ptr.k) === 1) ptr = ptr.r;
                if (this.cmp(k, ptr.k) === -1) ptr = ptr.l;
            }
            return ptr;
        }
    }
    
    // binary search tree class using above binary seach node class
    class RedBlackMap {
        constructor(k, v, cmp) {
            this.map = {};
            if (cmp instanceof Function) {
                this.root = new RedBlackNode(k, v, false, cmp);
                this.map[root.k] = this.root;
            } else if (v !== undefined) {
                this.root = new RedBlackNode(k, v, false, null);
                this.map[root.k] = this.root;
            } else if (k !== undefined) {
                this.root = new RedBlackNode(k, null, false, null);
                this.map[root.k] = this.root;
            } else {
                this.root = null;
            }
        }
    
        add(k, v) {
            if (this.root === null) {
                this.root = new RedBlackNode(k, v, false, null);
                this.map[root.k] = this.root;
                return this.root;
            }
    
            let ptr = this.root.add(k, v);
            if (this.root.p !== null) this.findRoot();
            this.map[k] = ptr;
            return ptr;
        }
    
        findRoot() {
            let ptr = this.root;
            while (ptr.p !== null) ptr = ptr.p;
            this.root = ptr;
        }
    
        find(k) {
            return this.root === null ? null : this.root.find(k);
        }
    
        first() {
            if (this.root === null) return null;
            let ptr = this.root;
            while (ptr.l !== null) ptr = ptr.l;
            return ptr;
        }
    
        last() {
            if (this.root === null) return null;
            let ptr = this.root;
            while (ptr.r !== null) ptr = ptr.r;
            return ptr;
        }
    
        index(i) {
            let ptr = this.first();
            if (ptr === null) return null;
            let ctr = 0;
            while (ptr !== null) {
                if (ctr === i) return ptr;
                ptr = ptr.getNext();
                ctr += 1;
            }
    
            return null;
        }
    
        array() {
            let ptr = this.index(0);
            const out = [];
            while (ptr != null) {
                out.push([ptr.k, ptr.red]);
                ptr = ptr.getNext();
            }
    
            return out;
        }
    
        tree() {
            let oldarr = [this.root];
            let newarr = [];
            console.log(this.root.k);
            while (true) {
                newarr = [];
                for (let k = 0; k < oldarr.length; k++) {
                    if (!(oldarr[k].l instanceof RedBlackNode)) {
                        process.stdout.write(`null, `);
                    } else {
                        newarr.push(oldarr[k].l);
                        process.stdout.write(`${oldarr[k].l.k}, `);
                    }
    
                    process.stdout.write(`(${oldarr[k].k}), `);
                    if (!(oldarr[k].r instanceof RedBlackNode)) {
                        process.stdout.write(`null   `);
                    } else {
                        newarr.push(oldarr[k].r);
                        process.stdout.write(`${oldarr[k].r.k}   `);
                    }
                }
                process.stdout.write('\n');
                if (newarr.length === 0) break;
                oldarr = newarr;
            }
        }
    }

    // Main algorithm: fills a binary search tree with "prefix sums" of a[i] taken % m; checks
    // a[i] % m for max, checks prefix sums for max, and checks prefix sums minus the next greatest
    // already calculated prefix sum (which means i < j, where sumall[j] - sumall[i]) for max.
    const pa = new RedBlackMap(0, 0);
    let out = 0;
    let prev = pa.root;
    for (let i = 0; i < a.length; i++) {
        a[i] = a[i] % m;
        if (a[i] > out) out = a[i];
        const curr = pa.add((prev.k + a[i]) % m, i);

        if (curr.k > out) out = curr.k;
        const next = curr.getNext();
        if (next != null) {
            if ((curr.k - next.k + m) % m > out) out = (curr.k - next.k + m) % m;
        }

        prev = curr;
    }

    return out;
}

/**
 * Same as above, but doesn't use a binary tree. Instead, just fills up an array with prefix
 * sums, and sorts it after the fact. Requires two passes, but node.js's built-in Array.sort()
 * method is way faster than my own merge sort (original attempt) or the above binary search
 * tree insert() and getNext() methods.
 *   *Passes all tests!!*
 * @param   {array}    a  Array of positive integers
 * @param   {integer}  m  Integer that sums of {a} subarrays will be taken modulo of
 * @returns {integer}     Maximum modulo of m of all subarrays of a
 */
function maximumSum(a, m) {
    const pa = [{id: -1, val: 0}];
    let out = 0;
    for (let i = 0; i < a.length; i++) {
        if (out === m - 1) return out;
        const ai = a[i] % m;
        if (ai > out) out = ai;
        const prefix = (ai + pa[i].val) % m;
        if (prefix > out) out = prefix;
        pa.push({ id: i, val: prefix });
    }

    pa.sort((a, b) => a.val - b.val);
    for (let i = 0; i < pa.length - 1; i++) {
        if (pa[i].id > pa[i + 1].id) {
            const diff = (pa[i].val - pa[i + 1].val + m) % m;
            if (diff > out) out = diff;
        }
    }

    return out;
}
