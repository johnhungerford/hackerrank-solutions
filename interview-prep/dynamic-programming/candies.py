# Returns the minimumnumber of candies a teacher would have to give out if she were going 
# to give out candies to her class where 1) her students each have an integer value, 
# 2) she always gives a student more candy than the student's neighbor if the neighbor has
# a lower value, and 3) she gives every student at least one candy
def candies(n, arr):
    out = [1]

    for i in range(1, n):
        if arr[i] > arr[i - 1]:
            out.append(out[i - 1] + 1)
        else:
            out.append(1)

    for i in range(n - 2, -1, -1):
        if arr[i] > arr[i + 1]:
            if out[i] < out[i + 1] + 1:
                out[i] = out[i + 1] + 1

    res = 0
    for i in out:
        res += i
        
    return res
