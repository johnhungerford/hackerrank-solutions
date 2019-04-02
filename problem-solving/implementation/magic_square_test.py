from magic_square import *

def test_copySquare():
    # should return new square with same values as the first
    s = [[4, 9, 2],[3, 5, 7],[8, 1, 5]]
    scopy = copySquare(s)
    assert scopy == [[4, 9, 2],[3, 5, 7],[8, 1, 5]]
    assert scopy is not s

def test_formingMagicSquare():
    # should give us the minimal amount of change to turn a 3x3 list of ints 
    # in range(0,10) into a magic square, meaning all rows, columns, and 
    # diagonals add up to the same number. Quantity of change is defined as
    # the sum of differences between original and new elements in list.
    assert formingMagicSquare([[4, 9, 2],[3, 5, 7],[8, 1, 5]]) == 1
    assert formingMagicSquare([[4, 8, 2],[4, 5, 7],[6, 1, 6]]) == 4

def test_getSums():
    # should give a list of sums of all rows, columns, and diagonals in a 3x3
    # list. Indexed as follows:
    # 0: top row, 1: middle row, 2: bottom row
    # 3: left column, 4: middle column, 5: right column
    # 6: top-left to bottom-right diagonal, 7: top-right to bottom-left diagonal
    assert getSums([[4, 9, 2],[3, 5, 7],[8, 1, 5]]) == [15, 15, 14, 15, 15, 14, 14, 15]
    assert getSums([[4, 8, 2],[4, 5, 7],[6, 1, 6]]) == [14, 16, 13, 14, 14, 15, 15, 13]
