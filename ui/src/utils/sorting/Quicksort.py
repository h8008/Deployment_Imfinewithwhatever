import math

def swap(A, i, j):
    temp = A[i]
    A[i] = A[j]
    A[j] = temp

def partition(A, l, r, p):
    while (l <= r):
        while (A[l] < p):
            l = l + 1
        while (r > l and A[r] >= p):
            r = r - 1
    if (r > l):
        swap(A, r, l)

def getPivot(i, j):
    return math.floor((i + j) / 2)

def quicksort(A, i, j):
    p = getPivot(i, j)
    swap(A, j, p)
    k = partition(A, i, j - 1, A[p])
    swap(A, k, j)
    if (k - i > 1):
        quicksort(A, 0, k - 1)
    if (j - k > 1):
        quicksort(A, k + 1, j)

A = [76, 6, 57, 88, 85, 42]
quicksort(A, 0, len(A) - 1)