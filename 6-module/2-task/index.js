import createElement from "../../assets/lib/create-element.js";

export default class ProductCard {
  elem;
  product;
  constructor(product) {
    this.product = product;
    this.elem = this.createProduct();
  }

  createProduct() {
    const html = this.createProductDom();

    const prAddEvent = new CustomEvent('product-add', {
      bubbles: true,
      detail: this.product.id
    });

    html.addEventListener('product-add', function (event) {});

    html.addEventListener('click', function (event) {
      let target = event.target.closest('.card__button');

      if (!target) {
        return;
      }

      html.dispatchEvent(prAddEvent);
    });

    return html;
  }

  createProductDom(product) {
    let html = `<div class="card">
    <div class="card__top">
        <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
        <span class="card__price">€${this.product.price.toFixed(2)}</span>
    </div>
    <div class="card__body">
        <div class="card__title">${this.product.name}</div>
        <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
    </div>
</div>`;
    return createElement(html);
  }
}
