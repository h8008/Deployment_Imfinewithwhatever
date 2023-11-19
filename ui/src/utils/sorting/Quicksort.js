const swap = (A, i, j) => {
  const temp = A[i];
  A[i] = A[j];
  A[j] = temp;
};

const partition = (A, l, r, p) => {
  while (l <= r) {
    while (A[l][1] > p) {
      l++;
    }
    while (r >= l && A[r][1] <= p) r--;
    if (r > l) swap(A, r, l);
  }
  return l;
};

const getPivot = (i, j) => {
  return Math.floor((i + j) / 2);
};

const quicksort = async (A, i, j) => {
  const p = await getPivot(i, j);
  await swap(A, j, p);
  const k = await partition(A, i, j - 1, A[j][1]);
  swap(A, k, j);
  if (k - i > 1) A = await quicksort(A, i, k - 1);
  if (j - k > 1) A = await quicksort(A, k + 1, j);
  return A;
};

export default quicksort;
