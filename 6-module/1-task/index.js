/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem;
  constructor(rows) {
    this.elem = document.createElement('TABLE');
    this.createThead({
        name: 'Имя',
        age: 'Возраст',
        salary: 'Зарплата',
        city: 'Город',
        asterisk: ''
      }
    );
    this.createTbody(rows);
  }

  createThead(heads) {
    let tHead = document.createElement('THEAD');
    let tr = document.createElement('TR');
    for (let item in heads) {
      let th = document.createElement('TH');
      th.innerText = heads[item];
      tr.append(th);
    }
    tHead.append(tr);

    this.elem.append(tHead);
  }

  createTbody(rows) {
    let tBody = document.createElement('TBODY');

    rows.map(item => {
      let tr = document.createElement('TR');
      for (let pName in item) {
        let td = document.createElement('TD');
        if (item.hasOwnProperty(pName)) {
          td.innerText = item[pName];
          tr.append(td);
        }
      }

      tr.append(this.createRmBtn());
      tBody.append(tr);
    });

    this.elem.append(tBody);
  }

  createRmBtn() {
    let btn = document.createElement('BUTTON');
    btn.innerText = 'X';
    btn.addEventListener('click', function (event) {
      let rm = event.target.closest('td');
      if (!rm) return;
      if (rm) {
        rm.parentElement.remove();
      }
    });
    let td = document.createElement('TD');
    td.append(btn);
    return td;
  }
}
