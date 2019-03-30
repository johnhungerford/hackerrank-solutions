# The following series of global variables and 
gs = [[1],[1]]
M = [0,0]

def getM(x):
    prod = 2
    i = 1
    while prod <= x:
        prod *= 2
        i += 1
    
    return i - 1

def getGs(decin):
    if decin < len(gs):
        return gs[decin][M[decin]]
    
    for dec in range(len(gs), decin + 1):
        M.append(getM(dec))
        gs.append([])
        if dec > 9:
            gs[dec].append(0)
        else:
            gs[dec].append(1)
        
        for i in range(1,M[dec] + 1):            
            sum = 0
            for decInt in range(0, 10):
                j = dec - decInt * (2 ** i)
                if j < 0:
                    break
                sum += gs[j][i - 1] if i - 1 < len(gs[j]) else gs[j][M[j]]
            gs[dec].append(sum)
    
    return gs[decin][M[decin]]

def getDecAndInd(x):
    dec = 0
    ctr = 0
    while ctr < x: 
        ctr += getGs(dec)
        dec += 1

    return [dec - 1, x + gs[dec - 1][M[dec - 1]] - ctr - 1]

def getDecValInt(decBin):
    lstDecBin = list(str(decBin))
    lstDecBin.reverse()
    decVal = 0
    for i in range(0, len(lstDecBin)):
        decVal += int(lstDecBin[i]) * 2 ** i
    
    return decVal

def getDecVal(decBin):
    decVal = 0
    for i in range(0, len(decBin)):
        decVal += decBin[i] * 2 ** i
    
    return decVal

def getDecBinStr(decBin):
    top = len(decBin) - 1
    while decBin[top] == 0 and top > 0:
        top -= 1

    arrOut = decBin[top::-1]
    return ''.join(str(i) for i in arrOut)

def getNextDecBin(decBin, dir = 1):
    if dir == 1:
        for i in range(0, len(decBin)):
            if decBin[i] >= 2 and (i + 1 >= len(decBin) or decBin[i+1] < 9):
                decBin[i] -= 2
                if i + 1 >= len(decBin):
                    decBin.append(1)
                else:
                    decBin[i+1] += 1
                
                if i == 0:
                    return decBin

                brk = False
                while not brk:
                    brk = True
                    for j in range(i, 0, -1):
                        if decBin[j] == 0:
                            continue
                        
                        for k in range(j - 1, j - 4, -1):
                            if k < 0:
                                break
                            
                            if decBin[k] == 9:
                                continue

                            while decBin[j] > 0 and decBin[k] + (2 ** (j - k)) <= 9:
                                brk = False
                                decBin[j] -= 1
                                decBin[k] += (2 ** (j - k))

                return decBin
    
    if dir == -1:
        for i in range(0, len(decBin) - 1):
            if decBin[i] < 8 and decBin[i + 1] >= 1:
                decBin[i] += 2
                decBin[i+1] -= 1

                brk = False
                while not brk:
                    brk = True
                    for j in range(i, 0, -1):
                        if decBin[j] == 9:
                            continue
                        
                        for k in range(j - 1, j - 3, -1):
                            if j <= 0:
                                break

                            while decBin[j] < 9 and decBin[k] - (2 ** (j - k)) >= 0:
                                brk = False
                                decBin[j] += 1
                                decBin[k] -= (2 ** (j - k))

                return decBin
    
    return -1
    
        
def getTopDecBin(dec):
    if dec >= len(gs):
        i = 0
        while getDecAndInd(i)[0] < dec:
            i += 4
    
    decBin = [1] * (M[dec] + 1)
    for i in range(len(decBin) - 1, -1, -1):
        decBin[i] = 0
        res = getDecVal(decBin)
        if res == dec:
            return decBin
        
        if res < dec:
            decBin[i] = 1

    return decBin

def getBottomDecBin(dec):    
    decBin = [0]
    for i in range(0, 20):
        if i >= len(decBin):
            decBin.append(0)

        for j in range(0, 10):
            decBin[i] = j
            res = getDecVal(decBin)
            if res == dec:
                return decBin
            
            if res > dec:
                for k in range(i - 1, -1, -1):
                    for l in range(9, -1, -1):
                        decBin[k] = l
                        res = getDecVal(decBin)
                        if res == dec:
                            return decBin
                        
                        if res < dec:
                            decBin[k] = l + 1
                            break

def getDecBin(dec, ind):
    if dec >= len(gs):
        getGs(dec)

    numDecBins = gs[dec][M[dec]]
    if ind > numDecBins // 2:
        decBin = getTopDecBin(dec)
        ctr = gs[dec][M[dec]] - 1
        while ctr != ind:
            decBin = getNextDecBin(decBin, -1)
            ctr -= 1
        return getDecBinStr(decBin)
    else:
        decBin = getBottomDecBin(dec)
        ctr = 0
        while ctr != ind:
            decBin = getNextDecBin(decBin, 1)
            ctr += 1
        
        return getDecBinStr(decBin)

def decibinaryNumbers(x):
    dec, ind = getDecAndInd(x)
    return getDecBin(dec, ind)
