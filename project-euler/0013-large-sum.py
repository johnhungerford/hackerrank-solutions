class NumStr:
    def __init__(self, strin):
        self.numstr = [int(e) for e in strin]
        self.numstr.reverse()
    
    def add(self, strin):
        addstr = [int(e) for e in strin]
        addstr.reverse()
        rem = 0
        for i in range(0, max(len(addstr), len(self.numstr))):
            addnum = addstr[i] if i < len(addstr) else 0
            selfnum = self.numstr[i] if i < len(self.numstr) else 0
            sumnum = rem + addnum + selfnum
            if sumnum > 9:
                if i < len(self.numstr):
                    self.numstr[i] = int(str(sumnum)[1])
                else:
                    self.numstr.append(int(str(sumnum)[1]))
                rem = int(str(sumnum)[0])
            else:
                if i < len(self.numstr):
                    self.numstr[i] = sumnum
                else:
                    self.numstr.append(sumnum)
                rem = 0
        if rem != 0:
            self.numstr.append(rem)
    
    def getTen(self):
        listOut = self.numstr[-1:-11:-1]
        return ''.join(str(e) for e in listOut)

N = int(input())
sumFifty = NumStr('')
for i in range(0, N):
    strtoadd = input()
    sumFifty.add(strtoadd)
print(sumFifty.getTen())