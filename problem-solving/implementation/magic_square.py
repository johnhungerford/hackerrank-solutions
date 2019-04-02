# Class to deal with magic squares: 3x3 list of ints in range 1 to 9, with no
# duplicates.
class MagicSquare:
    def __init__(self, s):
        self.s = copySquare(s)
        self.l = getSums(s)
        sum = None
        for i in self.l:
            if sum == None:
                sum = i
            if i != sum:
                self == -1
                return
    
    def getChange(self, other):
        change = 0
        for i in range(0,3):
            for j in range(0,3):
                change += abs(self.s[i][j] - other.s[i][j])
        
        return change

# return all possible magic squares
def getAllMagicSquares():
    lsout = []
    lsout.append(MagicSquare([[4,9,2],[3,5,7],[8,1,6]]))
    lsout.append(MagicSquare([[2,9,4],[7,5,3],[6,1,8]]))
    lsout.append(MagicSquare([[8,3,4],[1,5,9],[6,7,2]]))
    lsout.append(MagicSquare([[6,7,2],[1,5,9],[8,3,4]]))
    lsout.append(MagicSquare([[8,1,6],[3,5,7],[4,9,2]]))
    lsout.append(MagicSquare([[6,1,8],[7,5,3],[2,9,4]]))
    lsout.append(MagicSquare([[4,3,8],[9,5,1],[2,7,6]]))
    lsout.append(MagicSquare([[2,7,6],[9,5,1],[4,3,8]]))
    return lsout

# shallow copy a 3x3 list 
def copySquare(s):
    copy = [[0,0,0],[0,0,0],[0,0,0]]
    for i in range(0,3):
        for j in range(0,3):
            copy[i][j] = s[i][j]
    
    return copy

# get the sum of all rows columns and diagonals in a 3x3 list
def getSums(s):
    out = [0, 0, 0, 0, 0, 0, 0, 0]
    for i in range(0, 3):
        for j in range(0, 3):
            out[i] += s[i][j]
            out[3 + j] += s[i][j]
        out[6] += s[i][i]
        out[7] += s[i][2 - i]
    
    return out

# Main function: tell how much difference between all the elements in a 3x3 list
# to make it a magic square
def formingMagicSquare(s):
    sMagic = MagicSquare(s)
    change = None
    for i in getAllMagicSquares():
        thischange = sMagic.getChange(i)
        change = thischange if change == None or thischange < change else change
    
    return change

