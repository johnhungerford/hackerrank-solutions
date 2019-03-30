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
