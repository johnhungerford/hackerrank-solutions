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

def test_getM():
    assert getM(0) == 0
    assert getM(1) == 0
    assert getM(2) == 1
    assert getM(3) == 1
    assert getM(4) == 2
    assert getM(7) == 2
    assert getM(8) == 3
    assert getM(15) == 3
    assert getM(16) == 4
    assert getM(50) == 5

def test_getGs():
    assert getGs(0) == 1
    assert getGs(1) == 1
    assert getGs(2) == 2
    assert gs[2] == [1, 2]
    assert getGs(4) == 4
    assert gs[3] == [1, 2]
    assert gs[4] == [1, 3, 4]
    assert getGs(10) == 13
    assert gs[10] == [0, 5, 11, 13]
    assert getGs(50) == 277
    assert gs[50] == [0, 0, 14, 121, 241, 277]

def test_getDecAndInd():
    assert getDecAndInd(1) == [0, 0]
    assert getDecAndInd(2) == [1, 0]
    assert getDecAndInd(3) == [2, 0]
    assert getDecAndInd(4) == [2, 1]
    assert getDecAndInd(5) == [3, 0]
    assert getDecAndInd(6) == [3, 1]
    assert getDecAndInd(7) == [4, 0]
    assert getDecAndInd(8) == [4, 1]
    assert getDecAndInd(9) == [4, 2]
    assert getDecAndInd(10) == [4, 3]
    assert getDecAndInd(20) == [6, 5]

def test_getDecValInt():
    assert getDecValInt(0) == 0
    assert getDecValInt(9) == 9
    assert getDecValInt(1209) == 25
    assert getDecValInt(23423) == 79

def test_getDecBin():
    assert getDecBin(0, 0) == '0'
    assert getDecBin(2, 1) == '10'
    assert getDecBin(3, 1) == '11'
    assert getDecBin(4, 2) == '20'
    assert getDecBin(6, 5) == '110'

def test_getDecBinStr():
    assert getDecBinStr([0,0,0,1,0,0,0,0]) == '1000'
    assert getDecBinStr([3,5,0,7,4,8,3,7,9,2]) == '2973847053'
    assert getDecBinStr([0]) == '0'
    assert getDecBinStr([9]) == '9'
    assert getDecBinStr([0,0,0,0,0,0,0]) == '0'
    assert getDecBinStr([9,0,0,0,0,0,0,0,0,0,0,0,0,0]) == '9'

def test_getNextDecBin():
    assert getDecBinStr(getNextDecBin([4], 1)) == '12'
    assert getDecBinStr(getNextDecBin([2, 1], 1)) == '20'
    assert getDecBinStr(getNextDecBin([0, 2], 1)) == '100'
    assert getNextDecBin([0, 0, 1], 1) == -1
    assert getDecBinStr(getNextDecBin([0, 0, 1], -1)) == '20'
    assert getDecBinStr(getNextDecBin([0, 2], -1)) == '12'
    assert getDecBinStr(getNextDecBin([2, 1], -1)) == '4'
    assert getNextDecBin([4], -1) == -1

def test_getTopDecBin():
    assert getDecBinStr(getTopDecBin(0)) == '0'
    assert getDecBinStr(getTopDecBin(1)) == '1'
    assert getDecBinStr(getTopDecBin(2)) == '10'
    assert getDecBinStr(getTopDecBin(3)) == '11'
    assert getDecBinStr(getTopDecBin(4)) == '100'
    assert getDecBinStr(getTopDecBin(9)) == '1001'
    assert getDecBinStr(getTopDecBin(25)) == '11001'
    assert getDecBinStr(getTopDecBin(50)) == '110010'

def test_getBottomDecBin():
    assert getBottomDecBin(0) == [0]
    assert getBottomDecBin(1) == [1]
    assert getBottomDecBin(2) == [2]
    assert getBottomDecBin(3) == [3]
    assert getBottomDecBin(4) == [4]
    assert getBottomDecBin(9) == [9]
    assert getBottomDecBin(25) == [9, 8]
    assert getBottomDecBin(50) == [8, 9, 6]

def test_decibinaryNumbers():
    assert decibinaryNumbers(29) == '24'
    assert decibinaryNumbers(5) == '3'
    assert decibinaryNumbers(637) == '1138'
    assert decibinaryNumbers(7839) == '21148'
    assert decibinaryNumbers(9948517) == '998888'

decBinsUp = []
dec, ind = getDecAndInd(637)
decBin = getBottomDecBin(dec)
while decBin != -1:
    decBinsUp.append(decBin.copy())
    decBin = getNextDecBin(decBin, 1)

decBin = getTopDecBin(dec)
print(f'decBin: {decBin}')
print(f'last decBin on way up: {decBinsUp[-1]}')
for i in range(len(decBinsUp) - 1, -1, -1):
    if decBin != decBinsUp[i]:
        print('NOT EQUAL!!')
    print(f'decBin on way down: {decBin}')
    print(f'decBin from way up: {decBinsUp[i]}')
    decBin = getNextDecBin(decBin, -1)

# oldDecBin = []
# dec, ind = getDecAndInd(637)
# print(f'dec: {dec}, ind: {ind}')
# print(f'result: {decibinaryNumbers(7839)}')
# decBin = getBottomDecBin(dec)
# i = -1
# length = 3
# while decBin != -1:
#     i += 1
#     print(f'{i}:\t{decBin}')
#     if len(decBin) > length:
#         print(f'up a level, i = {i}')
#         length += 1
#     oldDecBin = decBin
#     decBin = getNextDecBin(decBin)

# print(f'i = {i}')

# decBin = oldDecBin
# while decBin != -1:
#     print(decBin)
#     if len(decBin) < length:
#         print(f'down a level, i = {i}')
#         length -= 1
#     oldDecBin = decBin
#     decBin = getNextDecBin(decBin, -1)
#     i -= 1  

# print(f'i = {i}')

# decBin = [8,1]
# i = 1
# length = 2
# while decBin != -1:
#     print(decBin)
#     if len(decBin) > length:
#         print(f'up a level, i = {i}')
#         length += 1
#     decBin = getNextDecBin(decBin)
#     i += 1

# print(f'i = {i}')