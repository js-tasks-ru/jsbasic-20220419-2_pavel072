function namify(users) {
  let names = [];
  users.forEach(function (user) {
    names.push(user.name);
  });
  return names;
}
