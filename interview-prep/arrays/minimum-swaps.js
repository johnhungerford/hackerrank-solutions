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
