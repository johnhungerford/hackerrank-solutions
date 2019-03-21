import sys

all_primes = [2]     # Cache of primes found so far (see gen_primes below)
non_primes = {4:[2]} # Maps composites to prime factors

def gen_primes():
    # The running integer that's checked for primeness
    i = 0
    q = 2
    
    while True:
        if i < len(all_primes):
            yield all_primes[i]
            q += 1
            i += 1
            continue

        if q not in non_primes:
            # q is a new prime.
            # Yield it and mark its first multiple that isn't
            # already marked in previous iterations
            yield q
            all_primes.append(q)
            non_primes[q * q] = [q]
        else:
            # q is composite. non_primes[q] is the list of primes that
            # divide it. Since we've reached q, we no longer
            # need it in the map, but we'll mark the next 
            # multiples of its prime factors to prepare for larger
            # numbers
            for p in non_primes[q]:
                non_primes.setdefault(p + q, []).append(p)
            del non_primes[q]

        q += 1
        i += 1

def append_combinations(p_map, p_list, res_list, current, k):
    if len(current) > 0:
        most_rec = current[-1]
        num_most_rec = 0
        #print(f'current: {current}')
        for i in current:
            #print(f'i: {i}, most_rec: {most_rec}')
            if i == most_rec:
                num_most_rec += 1

        #print(f'most_rec: {most_rec}; num_most_rec: {num_most_rec}')
        for i in range(0, len(p_list)):
            if p_list[i] == most_rec:
                start = i + 1 if num_most_rec == p_map[most_rec] else i
                break
    
        if start >= len(p_list):
            return
    else:
        start = 0
    
    for i in range(start, len(p_list)):
        new_curr = current[::]
        new_curr.append(p_list[i])
        if k == 1:
            res_list.append(new_curr)
        else:
            append_combinations(p_map, p_list, res_list, new_curr, k - 1)

def get_sum(p_map, k):
    #print(p_map)
    p_list = []
    for key in p_map:
        p_list.append(int(key))
            
    p_list.sort()
    divisors = []
    # get a list of all unique products of k elements from p_list
    current = []
    append_combinations(p_map, p_list, divisors, current, k)
    #print(divisors)
    sum = 0
    for i in divisors:
        product = 1
        for j in i:
            product *= j
        sum += product
    
    return sum

def get_primes(x):
    rem = x
    product = 1
    out = []
    for i in gen_primes():
        if rem == 1:
            return out
        if rem % i == 0:
            while rem % i == 0:
                rem = rem / i
                product *= i
                out.append(i)
        elif i * (i + 1) * product > x:
            out.append(rem)
            return out
    
    return False
    
def get_binomial_primes(N, M):
    pr_dict = {}
    for i in range(max(M+1, N-M+1), N+1):
        #print(f'i: {i}')
        for j in get_primes(i):
            #print(f'j: {j}')
            if j in pr_dict:
                pr_dict[j] += 1
            else:
                pr_dict[j] = 1
    
    #print(pr_dict)
    for i in range(2,min(M+1, N-M+1)):
        tmp = get_primes(i)
        for j in tmp:
            if pr_dict[j] > 1:
                pr_dict[j] -= 1
            else:
                del pr_dict[j]
    
    return pr_dict
    
if __name__ == '__main__':
    inp = input()
    inp = inp.split(' ')
    N = int(inp[0])
    M = int(inp[1])
    K = int(inp[2])
    p = get_binomial_primes(N, M)
    for k in range(1, K + 1):
        print(get_sum(p, k))

