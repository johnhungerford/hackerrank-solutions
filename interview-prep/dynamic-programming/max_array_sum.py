def maxSubsetSum(arr):
    solns = [arr[0], max(arr[0],arr[1])]
    for i in range(2,len(arr)):
        solns.append(max(arr[i], solns[i-1],arr[i]+solns[i-2]))
    return solns[-1]