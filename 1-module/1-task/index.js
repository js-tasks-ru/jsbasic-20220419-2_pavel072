function factorial(n) {
  n = +n;

  let fctr = n;

  if (fctr === 0 || fctr === 1) {
    return 1;
  }

  while (n !== 1) {
    fctr *= --n;
  }

  return fctr;
}
