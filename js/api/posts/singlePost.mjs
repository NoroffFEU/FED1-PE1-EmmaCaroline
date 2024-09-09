import { getSinglePost, deleteBlogPost } from "../posts/apiCalls.mjs";
import * as storage from "../../storage/index.mjs";

function createSinglePostHTML(responseData) {
  const post = responseData.data;

  if (!post || !post.title) {
    return "<p>Error: Invalid post data.</p>";
  }

  const formattedDate = new Date(post.created).toLocaleDateString();
  const formattedUpdatedDate = post.updated
    ? new Date(post.updated).toLocaleDateString()
    : "";
  const postTitle = post.title || "No title available";
  const postBody = post.body
    ? post.body.replace(/\n/g, "<br>")
    : "No content available";
  const postMedia = post.media || {};

  const profile = JSON.parse(localStorage.getItem("profile"));
  const name = profile ? profile.name : "emma_caroline";

  let postHTML = `
        <div class="post-content">
            <h1 class="title">${postTitle}</h1>
            <div class="media">
                <img src="${postMedia.url || ""}" alt="${postMedia.alt || ""}"> 
            </div>
            <div class="author-date-container">
            <div class="author">
                <i class="fa-solid fa-user"></i>
                <p>AUTHOR: ${name}</p>
            </div>
            <div class="date">
                <i class="fa-solid fa-calendar-days"></i>
                <p>CREATED: ${formattedDate}</p>
                ${
                  formattedUpdatedDate && post.updated !== post.created
                    ? `<p>UPDATED: ${formattedUpdatedDate}</p>`
                    : ""
                } <!-- Display updated date if available and different from created date -->
            </div>
        </div>
            <div class="copy-content">
                <p>${postBody}</p>
            </div>
        </div>
    `;

  return postHTML;
}

export async function displaySinglePost() {
  const singlePostContainer = document.getElementById("singlePostContainer");
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (!postId) {
    singlePostContainer.innerHTML = "<p>No post found.</p>";
    return;
  }

  try {
    const postResponse = await getSinglePost(postId);

    const postHTML = createSinglePostHTML(postResponse);

    singlePostContainer.innerHTML = postHTML;

    addButtonEventListeners();
    checkAccessToken();
  } catch (error) {
    singlePostContainer.innerHTML = "<p>No post found.</p>";
  }
}

function addButtonEventListeners() {
  const editButton = document.getElementById("editButton");
  const deleteButton = document.getElementById("deleteButton");

  if (editButton) {
    editButton.addEventListener("click", () => {
      const url = new URL(location.href);
      const id = url.searchParams.get("id");
      window.location.href = `../post/edit.html?id=${id}`;
    });
  }

  if (deleteButton) {
    deleteButton.addEventListener("click", async () => {
      const url = new URL(location.href);
      const id = url.searchParams.get("id");

      const confirmed = confirm("Are you sure you want to delete this post?");
      if (confirmed) {
        try {
          const response = await deleteBlogPost(id);
          if (response.ok) {
            alert("Post deleted successfully!");
            window.location.href = "../index.html";
          } else {
            alert("Failed to delete post.");
          }
        } catch (error) {
          alert("Failed to delete post.");
        }
      }
    });
  }
}

function checkAccessToken() {
  const accessToken = storage.load("token");

  if (accessToken) {
    document.getElementById("editButton").style.display = "block";
    document.getElementById("deleteButton").style.display = "block";
  } else {
    document.getElementById("editButton").style.display = "none";
    document.getElementById("deleteButton").style.display = "none";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displaySinglePost();
});
