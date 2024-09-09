// Banner carousel

import { getAllPosts } from "../api/posts/apiCalls.mjs";

async function fetchPosts() {
  try {
    const { data: posts } = await getAllPosts();
    posts.sort((a, b) => new Date(b.created) - new Date(a.created));
    return posts.slice(0, 3);
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return [];
  }
}

async function createCarouselSlides() {
  const posts = await fetchPosts();
  const carouselContainer = document.querySelector(
    ".banner-carousel-container"
  );

  if (!posts.length) {
    carouselContainer.innerHTML = "<p>No posts available</p>";
    return;
  }

  const slidesHTML = posts
    .map(
      (post) => `
        <div class="banner-images fade">
            <div class="banner-image-container">
                <div class="banner-image-overlay"></div>
                <img src="${post.media ? post.media.url : ""}" alt="${
        post.media ? post.media.alt : ""
      }">
            </div>
            <div class="banner-text">
                <h2>${post.title}</h2>
            </div>
            <div class="button">
                <a href="post/index.html?id=${post.id}">Read More</a>
            </div>
        </div>
    `
    )
    .join("");

  const dotsHTML = posts
    .map(
      (_, index) => `
        <span class="dot" onclick="currentSlide(${index + 1})"></span>
    `
    )
    .join("");

  carouselContainer.innerHTML = `
        ${slidesHTML}
        <a class="banner-prev" onclick="plusSlides(-1)">&#10094;</a>
        <a class="banner-next" onclick="plusSlides(1)">&#10095;</a>
        <div class="dots-container">${dotsHTML}</div>
    `;

  showSlides(slideIndex);
}

let slideIndex = 1;

export function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("banner-images");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

window.plusSlides = function (n) {
  showSlides((slideIndex += n));
};

window.currentSlide = function (n) {
  showSlides((slideIndex = n));
};

document.addEventListener("DOMContentLoaded", createCarouselSlides);
