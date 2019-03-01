/**
 * Checks whether a collection of words cut out from a magazine will be able
 * to produce a given message. Writes 'Yes' or 'No' to stdout.
 * @param {array: string} magazine  Words cut out from magazine (includes repeats)
 * @param {array: string} note		Words needed for ransome notes (includes repeats)
 */
function checkMagazine(magazine, note) {
    let magazineMap = {};
    for (let i = 0; i < magazine.length; i++) {
        if (magazineMap[magazine[i]] === undefined) {
            magazineMap[magazine[i]] = 1;
        } else {
            magazineMap[magazine[i]] += 1;
        }
    }

    let noteMap = {};
    for (let i = 0; i < note.length; i++) {
        if (magazineMap[note[i]] === undefined) return process.stdout.write('No\n');
        if (noteMap[note[i]] === undefined) {
            noteMap[note[i]] = 1;
        } else {
            noteMap[note[i]] += 1;
            if (magazineMap[note[i]] < noteMap[note[i]]) return process.stdout.write('No\n');
        }
    }

    return process.stdout.write('Yes\n');
}

/**
 * Returns the number of 'unordered anagrams' in a string, where an unordered
 * anagram is two substrings (distinct, but can overlap) of the same length
 * that can be rearranged to produce the same string.
 * @param {string} s  The string to be searched for anagrams
 * @return {integer}  The number of unordered anagrams discovered
 */
function sherlockAndAnagrams(s) {
	/**
	 * A class to encode all the necessary information about a string in order
	 * to compare it with another to determine whether they are an 'unordered'
	 * anagram' of each other.
	 */
    class Anagram {
    	// Produce anagram object from a string or by shallow copy (all properties
    	// are integers anyways) of another anagram instance.
        constructor(input) {
            if (typeof input === 'string' || input instanceof String) {
                if(this.length = input.length === 1) {
                	this.elems = 1;
                	this[input[0]] = 1;
                	return this;
                }
                this.elems = 0;
                for (let i = 0; i < input.length; i++) {
                    if (this[input[i]] === undefined) {
                        this.elems += 1;
                        this[input[i]] = 1;
                    } else {
                        this[input[i]] += 1;
                    }
                }
            } else if (input instanceof Anagram) {
                for (let k in input) {
                    if (input.hasOwnProperty(k)) this[k] = input[k];
                }
            }
        }

        // Add two anagram objects together. Equivalent to generating an
        // anagram object from the combination of the original strings
        addAna(ana) {
            this.length += ana.length;
            for (let k in ana) {
                if (ana.hasOwnProperty(k)) {
                    if (k === 'length' || k === 'elems') continue;

                    if (this[k] !== undefined) {
                        this[k] += ana[k];
                    } else {
                        this.elems += 1;
                        this[k] = ana[k];
                    }
                }
            }

            return true;
        }

        // Compares two anagram objects, returning true if the same, false if
        // not
        static cmp(a, b) {
            if (a.elems !== b.elems) return false;
            if (a.length !== b.length) return false;
            for (let k in a) {
                if (a[k] !== b[k]) return false;
            }

            return true;
        }
    }

    /** 
     * Build array of all potential anagrams (substrings made into Anagram
     * objects) by looping over all substrings.
     */
    const anas = [];
    for (let i = 0; i < s.length; i++) {

        anas.push(new Anagram(s[i]));
        for (let j = i + 1; j < s.length; j++) {

            anas.push(new Anagram(anas[anas.length - 1]));
            anas[anas.length - 1].addAna(new Anagram(s[j]));
        }
    }

	/** 
     * Count the number of anagrams by comparing all the matching anagrams 
     * stored in the array generated above
     */
    let numAnas = 0;
    for (let i = 0; i < anas.length; i++) {
        for (let j = i + 1; j < anas.length; j++) {
            if (Anagram.cmp(anas[i], anas[j])) numAnas += 1;
        }
    }

    return numAnas;
}


/**
 * Counts the number of 'geometric triplets' in an array of integers, where a
 * 'geometric triplet' is three elements in an array that follow a geometric
 * progression, and whose indices are ordered the direction of the progression
 * @param {array}    arr   The array to be searched for geometric triplets
 * @param {integer}  r     The ratio of the geometric progression
 * @return {integer}       How many geometric triplets are in arr
 */
 function countTriplets(arr, r) {
    // oneMap tells how many elements are one step behind any given value in the array
    const oneMap = {};
    // twoMap tells how many ordered pairs of elements are behind a given value
    const twoMap = {};
    let num = 0;
    // Cycle through all of the elements in the array
    for (let i = 0; i < arr.length; i++) {
        let product = r * arr[i];

        // We can add however many ordered pairs are behind this value to the count, since
        // each will combine with this value to form a triplet
        num += twoMap.hasOwnProperty(arr[i]) ? twoMap[arr[i]] : 0;

        // We can increment the twoMap for the next in the progression by however many
        // are given by the oneMap for the present value
        if (oneMap[arr[i]] !== undefined) {
            if (twoMap[product] === undefined) {
                twoMap[product] = oneMap[arr[i]];
            } else {
                twoMap[product] += oneMap[arr[i]];
            }
        }

        // Finally, we can increment the oneMap for the next in the progression by one,
        // since the present value is adding exactly one more such values
        if (oneMap[product] === undefined) {
            oneMap[product] = 1;
        } else {
            oneMap[product]++;
        }
    }

    return num;
}


/**
 * Responds to a series of queries, each of which can 1) add an element to a data
 * structure, 2) delete an element from a data structure, or 3) ask whether there are
 * an elements with a given frequency in the data structure
 * @param {array}  queries   2D array where arr[i] = [q,x], where q is 1,2, or 3 (see above)
 *							 and x is either the element to be added/deleted (q=1,2) or
 *							 the frequency to be tested (q=3)
 * @return {array} An array of outputs (generated only by q=3), which can be '1' or '0'
 *
 */
function freqQuery(queries) {
    let map = {};
    let fmap = {};
    let output = [];

    for (let i = 0; i < queries.length; i++) {
        let x = queries[i][1];
        switch (queries[i][0]) {
            case 1:
                if (map[x] === undefined) {
                    map[x] = 1;
                } else {
                    map[x] += 1;
                }

                fmap[map[x] - 1] -= 1;
                if (fmap[map[x]] === undefined) {
                    fmap[map[x]] = 1;
                } else {
                    fmap[map[x]] += 1;
                }
                continue;
            case 2:
                if (map[x] === undefined || map[x] < 1) continue;
                map[x] -= 1;
                fmap[map[x] + 1] -= 1;
                fmap[map[x]] += 1;
                continue;
            case 3:
                if (fmap[x] === undefined || fmap[x] < 1) {
                    output.push('0');
                    continue;
                }

                output.push('1');
                continue;
        }
    }

    return output;
}
