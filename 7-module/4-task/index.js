export default class StepSlider {
  constructor({steps, value = 0}) {
    this.elem = this.buildHtml(steps, value);
    this.steps = steps;
    this.value = value;

    this.elem.addEventListener('click', this.clickCallback.bind(this));

    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let slValue = this.elem.querySelector('.slider__value');
    let slSteps = this.elem.querySelector('.slider__steps');

    thumb.onpointerdown = function (event) {
      event.preventDefault();
      let left;
      let leftRelative;
      let slider = document.querySelector('.slider');

      document.addEventListener('pointermove', onMouseMove);
      document.addEventListener('pointerup', onMouseUp);
      slider.classList.add('slider_dragging');

      function onMouseMove(event) {
        left = event.clientX - slider.getBoundingClientRect().left;
        leftRelative = left / slider.offsetWidth;

        if (leftRelative < 0) {
          leftRelative = 0;
        }

        if (leftRelative > 1) {
          leftRelative = 1;
        }

        let value = getValue();
        let valuePercents = leftRelative * 100;
        setSlider(value, valuePercents);
      }

      function getValue() {
        let segments = steps - 1;
        let approximateValue = leftRelative * segments;
        return Math.round(approximateValue);
      }

      function onMouseUp() {
        let value = getValue();
        let segments = steps - 1;
        let valuePercents = value / segments * 100;
        document.removeEventListener('pointerup', onMouseUp);
        document.removeEventListener('pointermove', onMouseMove);
        setSlider(value, valuePercents);
        let customEvent = new CustomEvent('slider-change', {
          detail: value,
          bubbles: true
        });
        slider.dispatchEvent(customEvent);
        slider.addEventListener('slider-change', function (event) {});
      }

      function setSlider(value, valuePercents) {
        slValue.textContent = value;
        thumb.style.left = `${valuePercents}%`;
        progress.style.width = `${valuePercents}%`;
        slSteps.childNodes.forEach(function (element) {
          element.classList.remove('slider__step-active');
        });
        slSteps.children[value].classList.add('slider__step-active');
      }

    };

    thumb.ondragstart = function () {
      return false;
    };
  }

  buildHtml(steps, value) {
    const rootEl = document.createElement('DIV');
    rootEl.classList.add('slider');

    const thumb = document.createElement('DIV');
    thumb.classList.add('slider__thumb');
    rootEl.append(thumb);

    const sliderValue = document.createElement('SPAN');
    sliderValue.classList.add('slider__value');
    sliderValue.innerText = value;
    thumb.append(sliderValue);

    const progress = document.createElement('DIV');
    progress.classList.add('slider__progress');
    rootEl.append(progress);

    const sliderSteps = document.createElement('DIV');
    sliderSteps.classList.add('slider__steps');

    for (let i = 0; i < steps; i++) {
      let step = document.createElement('SPAN');
      if (i === 0) {
        step.classList.add('slider__step-active');
      }
      sliderSteps.append(step);
    }

    rootEl.append(sliderSteps);
    return rootEl;
  }

  clickCallback(event) {
    let thumb = this.elem.querySelector('.slider__thumb');
    let progress = this.elem.querySelector('.slider__progress');
    let slValue = this.elem.querySelector('.slider__value');

    let left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    let valuePercents = value / segments * 100;

    slValue.textContent = value;
    thumb.style.left = `${valuePercents}%`;
    progress.style.width = `${valuePercents}%`;

    let slSteps = this.elem.querySelector('.slider__steps');
    slSteps.childNodes.forEach(function (element) {
      element.classList.remove('slider__step-active');
    });
    slSteps.children[value].classList.add('slider__step-active');

    this.elem.addEventListener('slider-change', function (event) {});
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: value,
      bubbles: true
    }));
  }
}
