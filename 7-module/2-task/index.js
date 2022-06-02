import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.modal = this.createWrapper();
    this.addEvents();
  }

  setTitle(modalTitle) {
    let title = this.modal.querySelector('.modal__title');
    title.textContent = modalTitle;
  }

  setBody(element) {
    let body = this.modal.querySelector('.modal__body');
    body.replaceChildren(element);
  }

  open() {
    document.body.append(this.modal);
    document.body.classList.add('is-modal-open');
  }

  close() {
    if (document.body.classList.contains('is-modal-open')) {
      document.body.querySelector('.modal').remove();
      document.body.classList.remove('is-modal-open');
    }
  }

  closeByEsc(event) {
    if (event.code === 'Escape') {
      if (document.body.classList.contains('is-modal-open')) {
        document.body.querySelector('.modal').remove();
        document.body.classList.remove('is-modal-open');
      }
    }
  }

  createWrapper() {
    const rootEl = document.createElement('DIV');
    rootEl.classList.add('modal');

    const overlay = document.createElement('DIV');
    overlay.classList.add('modal__overlay');
    rootEl.append(overlay);

    const inner = document.createElement('DIV');
    inner.classList.add('modal__inner');
    rootEl.append(inner);

    const header = document.createElement('DIV');
    header.classList.add('modal__header');
    inner.append(header);

    const btn = document.createElement('BUTTON');
    btn.setAttribute('type', 'button');
    btn.classList.add('modal__close');
    header.append(btn);

    const img = document.createElement('IMG');
    img.setAttribute('src', '/assets/images/icons/cross-icon.svg');
    img.setAttribute('alt', 'close-icon');
    btn.append(img);

    const h3 = document.createElement('H3');
    h3.classList.add('modal__title');
    header.append(h3);

    const body = document.createElement('DIV');
    body.classList.add('modal__body');
    inner.append(body);

    return rootEl;
  }

  addEvents() {
    const mClose = this.modal.querySelector('.modal__close');
    mClose.addEventListener('click', this.close);
    document.addEventListener('keydown', this.closeByEsc);
  }
}
