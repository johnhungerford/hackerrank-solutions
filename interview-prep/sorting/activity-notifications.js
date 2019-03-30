/**
 * Counts how many reports of potential fraud a bank will issue during a period of time,
 * where a report is issued when the expenditure on one day is more than twice the median
 * exenditure over a given number of previous days.
 * @param  {array}   expenditure  Array of integers, each representing the expenditure on a
 *								  given day, in chronological order
 * @param  {integer} d 			  The number of trailing days to be considered for whether
 *								  a day's expenditure will flag a report
 * @return {return}				  The number of reports issued throughout the time period
 */
function activityNotifications(expenditure, d) {
    let a = new Array(201).fill(0);
    let mid1 = Math.floor((d - 1) / 2);
    let mid2 = Math.ceil((d - 1) / 2);
    let n = 0;
    let m1, m2 = null;
    for (let i = 0; i < d; i++) a[expenditure[i]] += 1;

    for (let i = 0, j = 0; i <= mid1; i += a[j], j++) m1 = j;
    for (let i = 0, j = 0; i <= mid2; i += a[j], j++) m2 = j;

    let m = (m1 + m2) / 2;

    if (expenditure[d] >= 2 * m) n += 1;

    for (let x = d + 1; x < expenditure.length; x++) {
        a[expenditure[x - d - 1]] -= 1;
        a[expenditure[x - 1]] += 1;

        // process.stdout.write(a + '\n');

        for (let i = 0, j = 0; i <= mid1; i += a[j], j++) m1 = j;
        for (let i = 0, j = 0; i <= mid2; i += a[j], j++) m2 = j;

        m = (m1 + m2) / 2;

        if (expenditure[x] >= 2 * m) n += 1;
    }

    return n;
}
