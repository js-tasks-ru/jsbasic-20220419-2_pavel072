function isEmpty(obj) {
  for (let value in obj) {
    if (obj.hasOwnProperty(value)) {
      return false;
    }
  }
  return true;
}
