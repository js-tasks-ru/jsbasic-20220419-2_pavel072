function camelize(str) {
  let newName = [];
  str.split('-').forEach((item, index) => {
    let res = item;
    if (index > 0) {
      if (item.length > 0) {
        res = item[0].toUpperCase();
        if (item.length > 1) {
          res += item.slice(1);
        }
      }
    }
    newName.push(res);
  });

  return newName.join('');
}
