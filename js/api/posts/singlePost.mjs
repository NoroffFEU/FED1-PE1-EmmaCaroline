
import { getSinglePost, deleteBlogPost } from '../posts/apiCalls.mjs';
import * as storage from "../../storage/index.mjs";

function createSinglePostHTML(responseData) {
    const post = responseData.data; // Access the post data correctly
    console.log('Post object:', post); // Log the post object for debugging

    // Check if the post object contains the expected properties
    if (!post || !post.title) {
        console.error('Invalid post data:', post);
        return '<p>Error: Invalid post data.</p>';
    }

    // Access properties from the post object
    const formattedDate = new Date(post.created).toLocaleDateString();
    const formattedUpdatedDate = post.updated ? new Date(post.updated).toLocaleDateString() : ''; // Check if updated date exists
    const postTitle = post.title || 'No title available';
    const postBody = post.body || 'No content available';
    const postMedia = post.media || {};

    const profile = JSON.parse(localStorage.getItem('profile'));
    const name = profile ? profile.name : 'emma_caroline'; // Default to "emma_caroline" if not logged in

    // Generate HTML for single post
    let postHTML = `
        <div class="post-content">
            <h1 class="title">${postTitle}</h1>
            <div class="author-date-container">
                <div class="author">
                    <i class="fa-solid fa-user"></i>
                    <p>AUTHOR: ${name}</p>
                </div>
                <div class="date">
                    <i class="fa-solid fa-calendar-days"></i>
                    <p>CREATED: ${formattedDate}</p>
                    ${formattedUpdatedDate && post.updated !== post.created ? `<p>UPDATED: ${formattedUpdatedDate}</p>` : ''} <!-- Display updated date if available and different from created date -->
                </div>
            </div>
            <div class="media">
                <img src="${postMedia.url || ''}" alt="${postMedia.alt || ''}">
            </div>
            <div class="copy-content">
                <p>${postBody}</p>
            </div>
            <div class="post-actions">
                <button id="editButton" style="display: none;">Edit</button>
                <button id="deleteButton" style="display: none;">Delete</button>
            </div>
        </div>
    `;

    return postHTML;
}

export async function displaySinglePost() {
    const singlePostContainer = document.getElementById('singlePostContainer');
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    console.log('Post ID:', postId); // Log postId

    if (!postId) {
        console.error('Post ID is missing');
        singlePostContainer.innerHTML = '<p>No post found.</p>';
        return;
    }

    try {
        const postResponse = await getSinglePost(postId); // No name parameter needed
        console.log('Fetched single post:', postResponse); // Log the entire post object

        // Generate HTML for single post
        const postHTML = createSinglePostHTML(postResponse);

        // Insert HTML into the container
        singlePostContainer.innerHTML = postHTML;

        // Add event listeners to the buttons
        addButtonEventListeners();
        checkAccessToken(); // Call after rendering HTML
    } catch (error) {
        console.error('Failed to fetch post:', error);
        singlePostContainer.innerHTML = '<p>No post found.</p>';
    }
}

function addButtonEventListeners() {
    const editButton = document.getElementById('editButton');
    const deleteButton = document.getElementById('deleteButton');

    if (editButton) {
        editButton.addEventListener('click', () => {
            const url = new URL(location.href);
            const id = url.searchParams.get("id");
            window.location.href = `../post/edit.html?id=${id}`;
        });
    }

    if (deleteButton) {
        deleteButton.addEventListener('click', async () => {
            const url = new URL(location.href);
            const id = url.searchParams.get("id");

            const confirmed = confirm('Are you sure you want to delete this post?');
            if (confirmed) {
                try {
                    const response = await deleteBlogPost(id);
                    if (response.ok) {
                        alert('Post deleted successfully!');
                        window.location.href = '../index.html'; // Redirect to homepage or another page
                    } else {
                        alert('Failed to delete post.');
                    }
                } catch (error) {
                    console.error('Failed to delete post:', error);
                    alert('Failed to delete post.');
                }
            }
        });
    }
}

function checkAccessToken() {
    const accessToken = storage.load("token");

    if (accessToken) {
        document.getElementById('editButton').style.display = 'block';
        document.getElementById('deleteButton').style.display = 'block';
    } else {
        document.getElementById('editButton').style.display = 'none';
        document.getElementById('deleteButton').style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displaySinglePost();
});


/*import { getSinglePost, deleteBlogPost } from '../posts/apiCalls.mjs';
import * as storage from "../../storage/index.mjs";

function createSinglePostHTML(responseData) {
    const post = responseData.data; // Access the post data correctly
    console.log('Post object:', post); // Log the post object for debugging

    // Check if the post object contains the expected properties
    if (!post || !post.title) {
        console.error('Invalid post data:', post);
        return '<p>Error: Invalid post data.</p>';
    }

    // Access properties from the post object
    const formattedDate = new Date(post.created).toLocaleDateString();
    const formattedUpdatedDate = post.updated ? new Date(post.updated).toLocaleDateString() : ''; // Check if updated date exists
    const postTitle = post.title || 'No title available';
    const postBody = post.body || 'No content available';
    const postMedia = post.media || {};

    const profile = JSON.parse(localStorage.getItem('profile'));
    const name = profile ? profile.name : 'emma_caroline'; // Default to "emma_caroline" if not logged in

    // Generate HTML for single post
    return `
        <div class="post-content">
            <h1 class="title">${postTitle}</h1>
            <div class="author-date-container">
                <div class="author">
                    <i class="fa-solid fa-user"></i>
                    <p>AUTHOR: ${name}</p>
                </div>
                <div class="date">
                    <i class="fa-solid fa-calendar-days"></i>
                    <p>CREATED: ${formattedDate}</p>
                    ${post.updated ? `<p>UPDATED: ${formattedUpdatedDate}</p>` : ''} <!-- Display updated date if available -->
                </div>
            </div>
            <div class="media">
                <img src="${postMedia.url || ''}" alt="${postMedia.alt || ''}">
            </div>
            <div class="copy-content">
                <p>${postBody}</p>
            </div>
            <div class="post-actions">
                <button id="editButton" style="display: none;">Edit</button>
                <button id="deleteButton" style="display: none;">Delete</button>
            </div>
        </div>
    `;
}

export async function displaySinglePost() {
    const singlePostContainer = document.getElementById('singlePostContainer');
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    console.log('Post ID:', postId); // Log postId

    if (!postId) {
        console.error('Post ID is missing');
        singlePostContainer.innerHTML = '<p>No post found.</p>';
        return;
    }

    try {
        const postResponse = await getSinglePost(postId); // No name parameter needed
        console.log('Fetched single post:', postResponse); // Log the entire post object

        // Generate HTML for single post
        const postHTML = createSinglePostHTML(postResponse);

        // Insert HTML into the container
        singlePostContainer.innerHTML = postHTML;

        // Add event listeners to the buttons
        addButtonEventListeners();
        checkAccessToken(); // Call after rendering HTML

        // Set the post ID as a hash fragment in the URL
        window.location.hash = `#${postId}`;
    } catch (error) {
        console.error('Failed to fetch post:', error);
        singlePostContainer.innerHTML = '<p>No post found.</p>';
    }
}

function addButtonEventListeners() {
    const editButton = document.getElementById('editButton');
    const deleteButton = document.getElementById('deleteButton');

    if (editButton) {
        editButton.addEventListener('click', () => {
            const url = new URL(location.href);
            const id = url.searchParams.get("id");
            window.location.href = `../post/edit.html?id=${id}`;
        });
    }

    if (deleteButton) {
        deleteButton.addEventListener('click', async () => {
            const url = new URL(location.href);
            const id = url.searchParams.get("id");

            const confirmed = confirm('Are you sure you want to delete this post?');
            if (confirmed) {
                try {
                    const response = await deleteBlogPost(id);
                    if (response.ok) {
                        alert('Post deleted successfully!');
                        window.location.href = '../index.html'; // Redirect to homepage or another page
                    } else {
                        alert('Failed to delete post.');
                    }
                } catch (error) {
                    console.error('Failed to delete post:', error);
                    alert('Failed to delete post.');
                }
            }
        });
    }
}

function checkAccessToken() {
    const accessToken = storage.load("token");

    if (accessToken) {
        document.getElementById('editButton').style.display = 'block';
        document.getElementById('deleteButton').style.display = 'block';
    } else {
        document.getElementById('editButton').style.display = 'none';
        document.getElementById('deleteButton').style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displaySinglePost();
});*/


