import decibinary_numbers as m

def test_getM():
    assert m.getM(0) == 0
    assert m.getM(1) == 0
    assert m.getM(2) == 1
    assert m.getM(3) == 1
    assert m.getM(4) == 2
    assert m.getM(7) == 2
    assert m.getM(8) == 3
    assert m.getM(15) == 3
    assert m.getM(16) == 4
    assert m.getM(50) == 5

def test_getGs():
    assert m.getGs(0) == 1
    assert m.getGs(1) == 1
    assert m.getGs(2) == 2
    assert m.gs[2] == [1, 2]
    assert m.getGs(4) == 4
    assert m.gs[3] == [1, 2]
    assert m.gs[4] == [1, 3, 4]
    assert m.getGs(10) == 13
    assert m.gs[10] == [0, 5, 11, 13]
    assert m.getGs(50) == 277
    assert m.gs[50] == [0, 0, 14, 121, 241, 277]

def test_getDecAndInd():
    assert m.getDecAndInd(1) == [0, 0]
    assert m.getDecAndInd(2) == [1, 0]
    assert m.getDecAndInd(3) == [2, 0]
    assert m.getDecAndInd(4) == [2, 1]
    assert m.getDecAndInd(5) == [3, 0]
    assert m.getDecAndInd(6) == [3, 1]
    assert m.getDecAndInd(7) == [4, 0]
    assert m.getDecAndInd(8) == [4, 1]
    assert m.getDecAndInd(9) == [4, 2]
    assert m.getDecAndInd(10) == [4, 3]
    assert m.getDecAndInd(20) == [6, 5]

def test_getDecValInt():
    assert m.getDecValInt(0) == 0
    assert m.getDecValInt(9) == 9
    assert m.getDecValInt(1209) == 25
    assert m.getDecValInt(23423) == 79

def test_getDecBin():
    assert m.getDecBin(0, 0) == '0'
    assert m.getDecBin(2, 1) == '10'
    assert m.getDecBin(3, 1) == '11'
    assert m.getDecBin(4, 2) == '20'
    assert m.getDecBin(6, 5) == '110'

def test_getDecBinStr():
    assert m.getDecBinStr([0,0,0,1,0,0,0,0]) == '1000'
    assert m.getDecBinStr([3,5,0,7,4,8,3,7,9,2]) == '2973847053'
    assert m.getDecBinStr([0]) == '0'
    assert m.getDecBinStr([9]) == '9'
    assert m.getDecBinStr([0,0,0,0,0,0,0]) == '0'
    assert m.getDecBinStr([9,0,0,0,0,0,0,0,0,0,0,0,0,0]) == '9'

def test_getNextDecBin():
    assert m.getDecBinStr(m.getNextDecBin([4], 1)) == '12'
    assert m.getDecBinStr(m.getNextDecBin([2, 1], 1)) == '20'
    assert m.getDecBinStr(m.getNextDecBin([0, 2], 1)) == '100'
    assert m.getNextDecBin([0, 0, 1], 1) == -1
    assert m.getDecBinStr(m.getNextDecBin([0, 0, 1], -1)) == '20'
    assert m.getDecBinStr(m.getNextDecBin([0, 2], -1)) == '12'
    assert m.getDecBinStr(m.getNextDecBin([2, 1], -1)) == '4'
    assert m.getNextDecBin([4], -1) == -1

def test_getTopDecBin():
    assert m.getDecBinStr(m.getTopDecBin(0)) == '0'
    assert m.getDecBinStr(m.getTopDecBin(1)) == '1'
    assert m.getDecBinStr(m.getTopDecBin(2)) == '10'
    assert m.getDecBinStr(m.getTopDecBin(3)) == '11'
    assert m.getDecBinStr(m.getTopDecBin(4)) == '100'
    assert m.getDecBinStr(m.getTopDecBin(9)) == '1001'
    assert m.getDecBinStr(m.getTopDecBin(25)) == '11001'
    assert m.getDecBinStr(m.getTopDecBin(50)) == '110010'

def test_getBottomDecBin():
    assert m.getBottomDecBin(0) == [0]
    assert m.getBottomDecBin(1) == [1]
    assert m.getBottomDecBin(2) == [2]
    assert m.getBottomDecBin(3) == [3]
    assert m.getBottomDecBin(4) == [4]
    assert m.getBottomDecBin(9) == [9]
    assert m.getBottomDecBin(25) == [9, 8]
    assert m.getBottomDecBin(50) == [8, 9, 6]

def test_decibinaryNumbers():
    assert m.decibinaryNumbers(29) == '24'
    assert m.decibinaryNumbers(5) == '3'
    assert m.decibinaryNumbers(637) == '1138'
    assert m.decibinaryNumbers(7839) == '21148'
    assert m.decibinaryNumbers(9948517) == '998888'

# decBinsUp = []
# dec, ind = getDecAndInd(637)
# decBin = getBottomDecBin(dec)
# while decBin != -1:
#     decBinsUp.append(decBin.copy())
#     decBin = getNextDecBin(decBin, 1)

# decBin = getTopDecBin(dec)
# print(f'decBin: {decBin}')
# print(f'last decBin on way up: {decBinsUp[-1]}')
# for i in range(len(decBinsUp) - 1, -1, -1):
#     if decBin != decBinsUp[i]:
#         print('NOT EQUAL!!')
#     print(f'decBin on way down: {decBin}')
#     print(f'decBin from way up: {decBinsUp[i]}')
#     decBin = getNextDecBin(decBin, -1)

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