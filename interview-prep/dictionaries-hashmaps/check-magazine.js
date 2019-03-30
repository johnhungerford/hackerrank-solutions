/**
 * Checks whether a collection of words cut out from a magazine will be able
 * to produce a given message. Writes 'Yes' or 'No' to stdout.
 * @param {array: string} magazine  Words cut out from magazine (includes repeats)
 * @param {array: string} note		Words needed for ransome notes (includes repeats)
 */
function checkMagazine(magazine, note) {
    let magazineMap = {};
    for (let i = 0; i < magazine.length; i++) {
        if (magazineMap[magazine[i]] === undefined) {
            magazineMap[magazine[i]] = 1;
        } else {
            magazineMap[magazine[i]] += 1;
        }
    }

    let noteMap = {};
    for (let i = 0; i < note.length; i++) {
        if (magazineMap[note[i]] === undefined) return process.stdout.write('No\n');
        if (noteMap[note[i]] === undefined) {
            noteMap[note[i]] = 1;
        } else {
            noteMap[note[i]] += 1;
            if (magazineMap[note[i]] < noteMap[note[i]]) return process.stdout.write('No\n');
        }
    }

    return process.stdout.write('Yes\n');
}
