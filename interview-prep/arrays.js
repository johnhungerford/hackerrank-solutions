/**
 * Get the maximum hourglass sum in a 6x6 2D array, where an hourglass sum is
 * the sum of integers in a pattern like this:  1  4  3
 *                                                -3
 *                                             -4  1  9
 * @param {array} arr Two dimensional array, 6x6, of integers between -9 and 9
 * @return {integer} Maximum of all possible hourglass sums in arr
 */
function hourglassSum(arr) {

	const singleSum = function(i, j) {
		if(i > arr.length - 3) return 0;
		if(j > arr[i].length - 3) return 0;

		let sum = 0;
		for(let ctr = j; ctr < j+3; ctr++) {
			sum += arr[i][ctr];
			sum += arr[i+2][ctr];
		}

		return sum + arr[i+1][j+1];
	}

	let maxsum = null;
	console.log('length y: '+ arr.length);
	for(let x = 0; x < arr.length - 2; x++) {
		console.log('length x: '+ arr[x].length);
		for(let y = 0; y < arr[x].length - 2; y++) {
			let newsum = singleSum(x, y);
			console.log(newsum);
			if(newsum > maxsum || maxsum === null) maxsum = newsum;
		}
	}

	return maxsum;
}

/**
 * Rotates an array left a given number of times
 * @param {array}   a  Array to be rotated
 * @param {integer} d  Number of rotations
 * @return {array} Rotated array
 */
function rotLeft(a, d) {
    Array.prototype.push.apply(a, a.splice(0, d));
    return a;
}

/**
 * Calculate the minimum number of "bribes" needed to get a group of people
 * in a line, numbered by consecutive integers beginning with 1, into a different,
 * given, order. Any person in the line can give a bribe to the person directly in
 * front of him to switch places, but can only do so twice. Writes either the min
 * number of bribes, or "Too chaotic" if no bribes will work, to stdout.
 * @param {array} q Array of integers in some "chaotic" order
 */
function minimumBribes(q) {

	let outval = 0;
    for(let i = 0; i < q.length; i++) {
    	if(q[i] - 1 > i + 2) {
    		process.stdout.write('Too chaotic\n');
    		return;
    	}
    	for(let j = max(0,q[i]-2); j < i; j++) {
    		if(q[j] > q[i]) outval += 1;
    	}
    }

    process.stdout.write(outval+'\n');

}

/**
 * Calculates the minimum number of swaps needed to get a jumbled
 * array of integers (from 1 to N, consequetive) into ascending order,
 * where a swap can be between any two elements in the array
 * @param {array} arr Array of jumbled integers
 * @return {integer} minimum number of swaps
 */
function minimumSwaps(arr) {
	const visited = [];
	const map = {};
	for(let i = 0; i < arr.length; i++) {
		visited.push(false);
		map[arr[i]] = i;
		if(arr[i] === i + 1) visited[i] = true;
	}

	let numswaps = 0;
	for(let i = 0; i < arr.length; i++) {
		//console.log(visited);
		//console.log(map);
		if(visited[i]) continue;
		let ptr = i;
		while(ptr != arr[i] - 1) {
			//console.log(ptr);
			//console.log(arr[ptr]);
			ptr = map[ptr + 1];
			visited[ptr] = true;
			numswaps += 1;
		}
	}

	return numswaps;
}

/**
 * Finds the highest value in an array of zeros that have been incremented according
 * to rules encoded in a 2D array, each of which includes the starting element to increment,
 * the last element to increment, and the amount to increment by. The challenge
 * is doing so for very a very large array of zeros and very long array of sum rules.
 * @param {integer} n        Number of elements in the array to be summed
 * @param {array}   queries  Array containing rules, each of which is an array of length 3
 * @return {integer} Maximum value in the summed array, after all rules applied.
 */
function arrayManipulation(n, queries) {
    let arr = [];
    for (let i = 0; i < n; i++) arr.push(0);

    for (let i = 0; i < queries.length; i++) {
        arr[queries[i][0] - 1] += queries[i][2];
        if (queries[i][1] < n) arr[queries[i][1]] -= queries[i][2];
    }

    let maxval = 0;
    let x = 0;
    for (let i = 0; i < arr.length; i++) {
        x += arr[i];
        if (x > maxval) maxval = x;
    }

    return maxval;
}
