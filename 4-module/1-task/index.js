function makeFriendsList(friends) {
  let ul = document.createElement('UL');

  for (let fr of friends) {
    let li = document.createElement('LI');
    li.innerHTML = fr.firstName + ' ' + fr.lastName;
    ul.append(li);
  }

  return ul;
}
