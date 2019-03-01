/**
 * Performs a bubble sort on an array of integers, and prints 1) the number of
 * swaps performed, 2) the first element of the sorted array, and 3) the last
 * element of the sorted array
 * @param {arra} a  The array to be sorted
 */
function countSwaps(a) {
    function swap(x,y) {
        let z = a[y];
        a[y] = a[x];
        a[x] = z;
    }

    let n = 0;
    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a.length - 1; j++) {
            // Swap adjacent elements if they are in decreasing order
            if (a[j] > a[j + 1]) {
                swap(j, j + 1);
                n += 1;
            }
        }
    }

    process.stdout.write('Array is sorted in '+n+' swaps.\n');
    process.stdout.write('First Element: ' + a[0] +'\n');
    process.stdout.write('Last Element: '+a[a.length-1]+'\n');
}