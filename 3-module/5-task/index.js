function getMinMax(str) {
  let arr = str.split(' ').filter((item) => {
    return +item;
  }).sort((a, b) => {
    return a - b;
  });

  return {
    min: Math.min.apply(null, arr),
    max: Math.max.apply(null, arr),
  };
}
