function highlight(table) {
  let tb = table.tBodies.item(0);

  for (let tr of tb.rows) {
    let cells = tr.cells;

    if (cells.item(1).textContent < 18) {
      tr.style.textDecoration = 'line-through';
    }

    if (cells.item(2)) {
      tr.classList.add(getGenderClass(cells.item(2).textContent));
    }

    if (cells.item(3)) {
      if (cells.item(3).hasAttribute('data-available')) {
        tr.classList.add(getAvailableClass(cells.item(3).dataset.available));
      } else {
        tr.setAttribute('hidden', 'hidden');
      }
    }
  }
}

function getGenderClass(gender) {
  if (gender === 'f') {
    return 'female';
  }
  if (gender === 'm') {
    return 'male';
  }
}

function getAvailableClass(status) {
  if (status === 'true') {
    return 'available';
  }
  if (status === 'false') {
    return 'unavailable';
  }
}
