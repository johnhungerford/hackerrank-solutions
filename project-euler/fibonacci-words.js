'use strict';

function getDab(a,b,n) {
    const f = [{a:true, len: a.length}, {b: true, len: b.length}];
    let i = 0;
    while(true) {
        f.push({one: f[i], two: f[i+1], len: f[i].len + f[i+1].len});
        if (f[f.length - 1].len >= n) break;
        i += 1;
    }
    
    let ptr = f[f.length - 1];
    let ctr = 0;
    while (true) {
        if (ptr.a) {/*console.log(`a`);*/ return a[n - ctr - 1];}
        if (ptr.b) {/*console.log(`b`);*/ return b[n - ctr - 1];}
        
        if (ctr + ptr.one.len < n) {
            ctr += ptr.one.len;
            ptr = ptr.two;
            //console.log(`Choosing 2; remaining: ${n - ctr}`);
            continue;
        }
        
        //console.log(`Choosing 1; remaining: ${n - ctr}`);
        ptr = ptr.one;
        continue;
    }
}

function processData(input) {
    const linesin = input.split('\n');
    const queries = parseInt(linesin[0]);
    for(let i = 1; i <= queries; i++) {
        const linein = linesin[i].split(' ');
        const result = getDab(linein[0], linein[1], parseInt(linein[2]));
        process.stdout.write(result+'\n');
    }  
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
let _input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
