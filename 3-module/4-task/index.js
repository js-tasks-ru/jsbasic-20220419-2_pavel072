function showSalary(users, age) {
  let result = users.filter((user) => {
    return user.age <= age;
  }).map((item) => {
    return item.name + ', ' + item.balance;
  });

  return result.join('\n');
}
