function toggleText() {
  let button = document.querySelector('.toggle-text-button');
  button.addEventListener('click', function (event) {
    let text = document.querySelector('#text');
    if (!text) return;
    text.hidden = !text.hidden;
  });
}
