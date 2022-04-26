function sumSalary(salaries) {
  let summ = 0;
  for (let value in salaries) {
    if (Number.isInteger(salaries[value])) {
      summ += salaries[value];
    }
  }
  return summ;
}
