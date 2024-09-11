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

  carouselContainer.innerHTML = "";

  if (!posts.length) {
    const noPostsMessage = document.createElement("p");
    noPostsMessage.textContent = "No posts available";
    carouselContainer.appendChild(noPostsMessage);
    return;
  }

  posts.forEach((post) => {
    const bannerImageDiv = document.createElement("div");
    bannerImageDiv.classList.add("banner-images", "fade");

    const bannerImageContainerDiv = document.createElement("div");
    bannerImageContainerDiv.classList.add("banner-image-container");

    const bannerImageOverlayDiv = document.createElement("div");
    bannerImageOverlayDiv.classList.add("banner-image-overlay");

    const img = document.createElement("img");
    img.src = post.media ? post.media.url : "";
    img.alt = post.media ? post.media.alt : "";

    bannerImageContainerDiv.appendChild(bannerImageOverlayDiv);
    bannerImageContainerDiv.appendChild(img);

    const bannerTextDiv = document.createElement("div");
    bannerTextDiv.classList.add("banner-text");
    const h2 = document.createElement("h2");
    h2.textContent = post.title;
    bannerTextDiv.appendChild(h2);

    const buttonDiv = document.createElement("div");
    buttonDiv.classList.add("button");
    const anchor = document.createElement("a");
    anchor.href = `post/index.html?id=${post.id}`;
    anchor.textContent = "Read More";
    buttonDiv.appendChild(anchor);

    bannerImageDiv.appendChild(bannerImageContainerDiv);
    bannerImageDiv.appendChild(bannerTextDiv);
    bannerImageDiv.appendChild(buttonDiv);

    carouselContainer.appendChild(bannerImageDiv);
  });

  const prevButton = document.createElement("a");
  prevButton.classList.add("banner-prev");
  prevButton.innerHTML = "&#10094;";
  prevButton.onclick = function () {
    plusSlides(-1);
  };

  const nextButton = document.createElement("a");
  nextButton.classList.add("banner-next");
  nextButton.innerHTML = "&#10095;";
  nextButton.onclick = function () {
    plusSlides(1);
  };

  const dotsContainer = document.createElement("div");
  dotsContainer.classList.add("dots-container");

  posts.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.onclick = function () {
      currentSlide(index + 1);
    };
    dotsContainer.appendChild(dot);
  });

  carouselContainer.appendChild(prevButton);
  carouselContainer.appendChild(nextButton);
  carouselContainer.appendChild(dotsContainer);

  showSlides(slideIndex);
}

let slideIndex = 1;

export function showSlides(numberOfSlides) {
  const slides = document.getElementsByClassName("banner-images");
  const dots = document.getElementsByClassName("dot");
  if (numberOfSlides > slides.length) {
    slideIndex = 1;
  }
  if (numberOfSlides < 1) {
    slideIndex = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

window.plusSlides = function (numberOfSlides) {
  showSlides((slideIndex += numberOfSlides));
};

window.currentSlide = function (numberOfSlides) {
  showSlides((slideIndex = numberOfSlides));
};

document.addEventListener("DOMContentLoaded", createCarouselSlides);
