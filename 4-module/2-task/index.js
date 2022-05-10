function makeDiagonalRed(table) {
  let i = 0;
  for (let tr of table.rows) {
    tr.cells[i].style.background = 'red';
    i++;
  }
}
