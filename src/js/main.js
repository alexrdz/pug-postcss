window.$ = function (selector) {
  return document.querySelector(selector);
}

var next = $('.next');
next.addEventListener('click', function (e) {
  e.preventDefault();
  $('.Right').classList.add('animate', 'slideInLeft');
  $('.ones').classList.toggle('hide');
  $('.Left').classList.add('animate', 'slideUp', 'slow');
})
