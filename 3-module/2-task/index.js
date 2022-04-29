function filterRange(arr, a, b) {
  let filtred = [];
  arr.forEach(function (item) {
    if (item >= a && item <= b) {
      filtred.push(item);
    }
  });
  return filtred;
}
