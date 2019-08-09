// https://www.hackerrank.com/challenges/down-to-zero-ii/problem

var minArr: Array[Int] = Array.fill(1000001) { -1 }
minArr(0) = 0; minArr(1) = 1; minArr(2) = 2

var max = 2

def downToZero(n: Int): Int = {
    /*
        * Write your code here.
        */
    while (max < n) {
        // if (max > 500000) print(s"${max}, ${n}; ")
        val nextMin = minArr(max) + 1
        if (minArr(max + 1) == -1 || minArr(max + 1) > nextMin) 
            minArr(max + 1) = nextMin

        (2 to math.min(max, 1000000 / max)).foreach((x) => {
            if (minArr(x * max) == -1 || minArr(x * max) > nextMin)
                minArr(x * max) = nextMin
        })
        
        max += 1
    }

    return minArr(n)
}
