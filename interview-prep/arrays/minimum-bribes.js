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
