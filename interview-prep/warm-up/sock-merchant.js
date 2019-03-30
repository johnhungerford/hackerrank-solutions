/**
 * Returns the number of pairs of socks in an array of socks of varying color
 * @param {integer} n    Number of socks in array
 * @param {array}   ar   Array of integers representing color code of sock ar[i]
 * @return {integer} Total number of pairs of integers found in ar
 */
function sockMerchant(n, ar) {
    let pairs = 0;
    while (ar.length != 0) {
        
        for (let j = 1; j < ar.length; j++) {
            if (ar[0] === ar[j]) {
                pairs += 1;
                ar.splice(j, 1);
                break;
            }
        }

        ar.splice(0, 1);
    }

    return pairs;
}
