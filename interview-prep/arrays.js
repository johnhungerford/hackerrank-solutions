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
