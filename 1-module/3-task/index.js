function ucFirst(str) {
  let res = '';
  if (str.length > 0) {
    res = str[0].toUpperCase();
    if (str.length > 1) {
      res += str.slice(1);
    }
  }
  return res;
}
