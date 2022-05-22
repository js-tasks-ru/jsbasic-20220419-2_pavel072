import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.elem = this.createSlider(slides);
    this.initCarousel(this.elem);
  }

  createSlider(slides) {
    let slideDom;
    let carouselInner = document.createElement('DIV');
    carouselInner.classList.add('carousel__inner');

    for (let slide of slides) {
      slideDom = this.createSlideDomElement(slide);
      this.addClickEvent(slideDom);
      carouselInner.appendChild(slideDom);
    }

    let main = this.createMainContainer();
    main.append(carouselInner);

    return main;
  }

  createSlideDomElement(slide) {
    return createElement(`<div class="carousel__slide" data-id="${slide.id}">
  <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
  <div class="carousel__caption">
    <span class="carousel__price">€${slide.price}"</span>
    <div class="carousel__title">${slide.name}</div>
    <button type="button" class="carousel__button">
      <img src="/assets/images/icons/plus-icon.svg" alt="icon">
    </button>
  </div>
</div>`);
  }

  createMainContainer() {
    return createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
       </div>
    `);
  }

  initCarousel(carousel) {
    const carouselInner = carousel.querySelector('.carousel__inner');
    let sliderStep = 0;

    carousel.querySelector('.carousel__arrow_left').style.display = 'none';

    carousel.addEventListener('click', function (event) {
      let target = event.target.closest('.carousel__arrow');

      if (!target) {
        return;
      }

      if (target.classList.contains('carousel__arrow_left')) {
        sliderStep--;
      }

      if (target.classList.contains('carousel__arrow_right')) {
        sliderStep++;
      }

      if (sliderStep === (carouselInner.childElementCount - 1) || sliderStep === 0) {
        target.style.display = 'none';
      }

      if (sliderStep === 1) {
        this.querySelector('.carousel__arrow_left').style.display = '';
      }

      if (sliderStep === (carouselInner.childElementCount - 2)) {
        this.querySelector('.carousel__arrow_right').style.display = '';
      }

      carouselInner.style.transform = 'translateX(-' + carouselInner.offsetWidth * sliderStep + 'px)';
    });
  }

  addClickEvent(slide) {
    slide.querySelector('.carousel__button').addEventListener('click', function (event) {
      let target = event.target.closest('div');

      if (!target) {
        return;
      }

      slide.addEventListener('product-add', function (event) {});

      slide.dispatchEvent(new CustomEvent('product-add', {
        bubbles: true,
        detail: slide.dataset.id
      }));
    });
  }
}
