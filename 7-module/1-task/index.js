import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.elem = this.createMenu(categories);
    this.initCarousel(this.elem);
    this.addCustomEvent(this.elem);
  }

  createMenu(categories) {
    const ribbon = document.createElement('DIV');
    ribbon.classList.add('ribbon');

    let btnLeft = this.createBtn();
    btnLeft.classList.add('ribbon__arrow_left');
    btnLeft.classList.add('ribbon__arrow_visible');
    ribbon.append(btnLeft);

    const ribInner = document.createElement('DIV');
    ribInner.classList.add('ribbon__inner');

    for (let catNum in categories) {
      let link = this.createLink(categories[catNum].id, categories[catNum].name);
      if (+catNum === 0) {
        link.classList.add('ribbon__item_active');
      }
      ribInner.append(link);
    }

    ribbon.append(ribInner);
    let btnRight = this.createBtn();
    btnRight.classList.add('ribbon__arrow_right');
    btnRight.classList.add('ribbon__arrow_visible');
    ribbon.append(btnRight);

    return ribbon;
  }

  createBtn() {
    const btn = document.createElement('BUTTON');
    btn.classList.add('ribbon__arrow');
    const img = document.createElement('IMG');
    img.setAttribute('src', '/assets/images/icons/angle-icon.svg');
    img.setAttribute('alt', 'icon');
    btn.append(img);
    return btn;
  }

  createLink(dataId, text) {
    const link = document.createElement('A');
    link.setAttribute('href', '#');
    link.classList.add('ribbon__item');
    link.setAttribute('data-id', dataId);
    link.innerText = text;
    return link;
  }

  initCarousel(ribbon) {

    const ribbonInner = ribbon.querySelector('.ribbon__inner');

    ribbon.querySelector('.ribbon__arrow_left').classList.remove('ribbon__arrow_visible');

    ribbon.addEventListener('click', function (event) {
      let target = event.target.closest('.ribbon__arrow');

      if (!target) {
        return;
      }

      if (target.classList.contains('ribbon__arrow_left')) {
        ribbonInner.scrollBy(-350, 0);
      }

      if (target.classList.contains('ribbon__arrow_right')) {
        ribbonInner.scrollBy(350, 0);
      }
    });

    let rigthBtn = ribbon.querySelector('.ribbon__arrow_right');
    let leftBtn = ribbon.querySelector('.ribbon__arrow_left');

    ribbonInner.addEventListener('scroll', function (event) {
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth; // число пикселей, например, 100 или 0.

      if (scrollRight < 1) {
        if (rigthBtn.classList.contains('ribbon__arrow_visible')) {
          rigthBtn.classList.remove('ribbon__arrow_visible');
        }
      }

      if (scrollLeft < 1) {
        if (leftBtn.classList.contains('ribbon__arrow_visible')) {
          leftBtn.classList.remove('ribbon__arrow_visible');
        }
      }

      if (scrollRight > 1 && scrollLeft > 1) {
        if (!rigthBtn.classList.contains('ribbon__arrow_visible')) {
          rigthBtn.classList.add('ribbon__arrow_visible');
        }
        if (!leftBtn.classList.contains('ribbon__arrow_visible')) {
          leftBtn.classList.add('ribbon__arrow_visible');
        }
      }
    });
  }

  addCustomEvent(elem) {
    const ribbonInner = elem.querySelector('.ribbon__inner');
    ribbonInner.addEventListener('click', function (event) {
      event.preventDefault();

      let target = event.target.closest('.ribbon__item');
      if (!target) {
        return;
      }

      ribbonInner.querySelectorAll('.ribbon__item').forEach(item => {
        item.classList.remove('ribbon__item_active');
      });

      target.classList.add('ribbon__item_active');

      let custEvent = new CustomEvent('ribbon-select', {
        detail: target.dataset.id,
        bubbles: true
      });

      elem.dispatchEvent(custEvent);
    });

    elem.addEventListener('ribbon-select', function (event) {});
  }
}
