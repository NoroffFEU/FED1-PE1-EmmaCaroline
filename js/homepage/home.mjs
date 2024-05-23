
// Banner carousel

let slideIndex = 1;
showSlides(slideIndex);

export function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("banner-images");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace("active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

window.plusSlides = function(n) {
  showSlides(slideIndex += n);
}

window.currentSlide = function(n) {
  showSlides(slideIndex = n);
}


// Thumbnail grid


// Clears the textarea for the subscribe button, to improve the realism of the site

document.getElementById('clearButton').addEventListener('click', function() {
  document.getElementById('subscribe-email').value = '';
});