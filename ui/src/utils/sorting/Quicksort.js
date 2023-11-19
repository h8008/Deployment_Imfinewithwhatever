const swap = (A, i, j) => {
  const temp = A[i];
  A[i] = A[j];
  A[j] = temp;
};

const partition = (A, l, r, p) => {
  while (l <= r) {
    while (A[l] < p) {
      l++;
    }
    while (r > l && A[r] >= p) r--;
  }
  if (r > l) swap(A, r, l);
  return l;
};

const getPivot = (i, j) => {
  return Math.floor((i + j) / 2);
};

const quicksort = async (A, i, j) => {
  const p = await getPivot(i, j);
  await swap(A, j, A[p]);
  const k = await partition(A, i, j - 1, p);
  swap(A, k, j);
  if (k - i > 1) await quicksort(A, 0, k - 1);
  if (j - k > 1) await quicksort(A, k + 1, j);
};

const A = [76, 6, 57, 88, 85, 42];
quicksort(A, 0, A.length - 1).then((A) => console.log(A));

// export default quicksort;
