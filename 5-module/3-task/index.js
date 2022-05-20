function initCarousel() {

  const carousel = document.querySelector('.carousel');
  const carouselInner = document.querySelector('.carousel__inner');
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
