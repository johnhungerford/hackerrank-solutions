def abbreviation(a, b):
    check = [ ([0] * (len(b)+1)) for i in range(len(a)+1) ]
    jend = len(b)
    iend = len(a)
    check[iend][jend] = True
    for j in range(jend - 1,-1,-1):
        check[iend][j] = False
    
    for i in range(iend - 1,-1,-1):
        check[i][jend] = False if a[i].isupper() else check[i+1][jend]
    
    for i in range(iend - 1,-1,-1):
        for j in range(jend - 1, -1,-1):
            if a[i] == b[j]:
                check[i][j] = check[i+1][j+1]
                continue
            if a[i].upper() == b[j]:
                check[i][j] = check[i+1][j+1] or check[i+1][j]
                continue
            if a[i].isupper():
                check[i][j] = False
                continue
            check[i][j] = check[i+1][j]
    
    return 'YES' if check[0][0] else 'NO'