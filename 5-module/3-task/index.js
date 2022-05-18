function initCarousel() {

  let ci = document.querySelector('.carousel__inner');
  let right = document.querySelector('.carousel__arrow_right');
  let left = document.querySelector('.carousel__arrow_left');
  left.style.display = 'none';

  ci.sliderStep = 0;
  ci.sharedWidth = 0;

  ci.slide = function () {
    this.style.transform = 'translateX(' + this.sharedWidth + 'px)';
  };

  ci.hideElement = function (element) {
    if (this.sliderStep === (this.childElementCount - 1) || this.sliderStep === 0) {
      element.style.display = 'none';
    }
  };

  ci.showElement = function (element) {
    if (element.style.display === 'none') {
      element.style.display = '';
    }
  };

  right.addEventListener('click', function (event) {
    ci.sharedWidth -= ci.offsetWidth;
    ci.sliderStep++;
    ci.hideElement(this);
    ci.showElement(left);
    ci.slide();
  });

  left.addEventListener('click', function (event) {
    ci.sharedWidth += ci.offsetWidth;
    ci.sliderStep--;
    ci.hideElement(this);
    ci.showElement(right);
    ci.slide();
  });

}
