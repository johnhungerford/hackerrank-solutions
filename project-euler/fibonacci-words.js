'use strict';

/**
 * The following three functions provide some simple arithmetic operations for positive integers
 * encoded in strings. They are necessary for cases (such as this) where numbers overflow node's
 * built-in number primitive. This algorithm deals with numbers that go as high as 2^100, and node
 * numbers can safely go only as high as 2^53 - 1.
 */
// Standard comparator function: a > b => 1, a < b => -1, a == b => 0
function stringCmp(a,b) {
    if (a.length > b.length) return 1;
    if (a.length < b.length) return -1;
    return a > b ? 1 : a < b ? -1 : 0;
}

// add a and b
function stringAdd(a,b) {
    const small = a.length > b.length ? b : a;
    const large = a.length > b.length ? a : b;
    const c = new Array(large.length).fill('0');
    const out = new Array(large.length).fill('0');
    const diff = large.length - small.length;
    let rem = '0';
    for (let i = large.length - 1; i >= 0; i--) {
        const smi = i - diff < 0 ? 0 : parseInt(small[i - diff]);
        const lgi = parseInt(large[i]);
        const sum = lgi + smi + parseInt(c[i]);
        if (sum > 9) {
            if (i > 0) c[i - 1] = '1';
            if (i === 0) rem = '1';
            out[i] = (sum - 10).toString()[0];
            continue;
        }
        
        out[i] = sum.toString()[0];
    }
    
    let outstr = rem === '0' ? out.join('') : rem + out.join('');
    return outstr;
}

// Subtract b from a
function stringSub(a,b) {
    if (a.length < b.length) return false;
    const c = new Array(a.length).fill('0');
    const out = new Array(a.length).fill('0');
    const diff = a.length - b.length
    for (let i = a.length - 1; i >= 0; i--) {
        const ai = parseInt(a[i]);
        const bi = i - diff < 0 ? 0 : parseInt(b[i - diff]);
        const ci = parseInt(c[i]);
        if (bi + ci > ai) {
            if (i === 0) return false;
            out[i] = (ai + 10 - bi - ci).toString()[0];
            c[i - 1] = '1';
            continue;
        }
        
        out[i] = (ai - bi - ci).toString()[0];
    }
    
    let outstr = out.join('');
    return outstr;
}

/**
 * Finds the nth element in a fibonacci word. Fibonacci words are constructed from two strings: 
 * F(a,b) = [a, b, ab, bab, abbab, bababbab, ...], where a and b are the component strings. This
 * function returns the nth character of the first word in the fibonacci word sequence that is
 * long enough to have an nth character. This is called Dab(n).
 * This version of Dab, along with the string arithmetic above, passed all the hackerrank tests.
 * @param {string} a first fibonacci word
 * @param {string} b second fibonacci word
 * @param {number} n index of the character to be returned from the first fibonacci word long
 *                   enough to have such an index
 * @returns {character} Dab(n)
 */
function getDab(a,b,n) {
    const f = [{a:true, len: a.length.toString()}, {b: true, len: b.length.toString()}];
    let i = 0;
    while(true) {
        f.push({one: f[i], two: f[i+1], len: stringAdd(f[i].len, f[i+1].len)});
        if (stringCmp(f[f.length - 1].len, n) >= 0) break;
        i += 1;
    }
    
    let ptr = f[f.length - 1];
    let ctr = '0';
    while (true) {
        if (ptr.a) {return a[parseInt(stringSub(n, stringAdd(ctr, '1')))];}
        if (ptr.b) {return b[parseInt(stringSub(n, stringAdd(ctr, '1')))];}
        
        if (stringCmp(stringAdd(ctr, ptr.one.len), n) === -1) {
            ctr = stringAdd(ctr, ptr.one.len);
            ptr = ptr.two;
            continue;
        }
        
        ptr = ptr.one;
        continue;
    }
}

/**
 * Parses the input and calls getDab() for each query, printing its result to stdout. Expected 
 * input should have two or more lines. The first line should be a single integer stated the
 * number of subsequent queries. Each line after that is a query. Each query includes three strings
 * separated by spaces: string a, string b, and an integer n.
 */ 
function processData(input) {
    const linesin = input.split('\n');
    const queries = parseInt(linesin[0]);
    for(let i = 1; i <= queries; i++) {
        const linein = linesin[i].split(' ');
        const result = getDab(linein[0], linein[1], linein[2]);
        process.stdout.write(result+'\n');
    }  
} 

// Receive input for processing
process.stdin.resume();
process.stdin.setEncoding("ascii");
let _input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
