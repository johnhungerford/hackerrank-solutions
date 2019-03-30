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
