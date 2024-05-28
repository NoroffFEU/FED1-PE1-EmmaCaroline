
/*import { getAllPosts } from '../posts/apiCalls.mjs';

document.addEventListener('DOMContentLoaded', async () => {
    const thumbnailGrid = document.getElementById('thumbnailGrid');
    const searchInput = document.getElementById('searchInput');
    const sortPostsDropdown = document.getElementById('sortPosts');

    let posts = [];

    async function displayPosts(filteredPosts) {
        thumbnailGrid.innerHTML = '';
        filteredPosts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'blog-post-thumbnail';
            postDiv.innerHTML = `
                <div class="grid-image-container">
                    ${post.media ? `<a href="post/index.html?id=${post.id}"><img src="${post.media.url}" alt="${post.media.alt}"></a>` : ''}
                </div>
                <h3 class="blog-post-title"><a href="post/index.html?id=${post.id}">${post.title}</a></h3>
            `;
            thumbnailGrid.appendChild(postDiv);
        });
    }

    async function fetchAndDisplayAllPosts(searchTerm = '', sortOrder = 'newest') {
        try {
            const { data } = await getAllPosts();
            if (!Array.isArray(data)) {
                return;
            }
            posts = data;

            const filteredPosts = posts.filter(post => 
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
            );

            filteredPosts.sort((a, b) => {
                const dateA = new Date(a.created);
                const dateB = new Date(b.created);
                return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
            });

            displayPosts(filteredPosts);
        } catch (error) {
            alert("Failed to fetch posts");
        }
    }

    searchInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            const query = searchInput.value.toLowerCase();
            const sortOrder = sortPostsDropdown.value;
            fetchAndDisplayAllPosts(query, sortOrder);
        }
    });

    sortPostsDropdown.addEventListener('change', (event) => {
        const sortOrder = event.target.value;
        const query = searchInput.value.toLowerCase();
        fetchAndDisplayAllPosts(query, sortOrder);
    });

    await fetchAndDisplayAllPosts();
});*/


import { getAllPosts } from '../posts/apiCalls.mjs';

document.addEventListener('DOMContentLoaded', async () => {
    const thumbnailGrid = document.getElementById('thumbnailGrid');
    const searchInput = document.getElementById('searchInput');
    const sortSelect = document.getElementById('sortSelect');

    let posts = [];

    function displayPosts(filteredPosts) {
        thumbnailGrid.innerHTML = '';
        filteredPosts.forEach(post => {
            const postDiv = document.createElement('div');
            postDiv.className = 'blog-post-thumbnail';
            postDiv.innerHTML = `
                <div class="grid-image-container">
                    ${post.media ? `<a href="post/index.html?id=${post.id}"><img src="${post.media.url}" alt="${post.media.alt}"></a>` : ''}
                </div>
                <h3 class="blog-post-title"><a href="post/index.html?id=${post.id}">${post.title}</a></h3>
            `;
            thumbnailGrid.appendChild(postDiv);
        });
    }

    async function fetchAndDisplayAllPosts() {
        try {
            const { data } = await getAllPosts();
            if (!Array.isArray(data)) {
                return;
            }
            posts = data;
            displayPosts(posts);
        } catch (error) {
            alert("Failed to fetch posts");
        }
    }

    function sortPosts(posts, order) {
        return posts.sort((a, b) => {
            const dateA = new Date(a.created);
            const dateB = new Date(b.created);
            return order === 'newest' ? dateB - dateA : dateA - dateB;
        });
    }

    function filterAndSortPosts() {
        const query = searchInput.value.toLowerCase();
        const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(query));
        const sortedPosts = sortPosts(filteredPosts, sortSelect.value);
        displayPosts(sortedPosts);
    }

    searchInput.addEventListener('input', () => {
        filterAndSortPosts();
    });

    sortSelect.addEventListener('change', () => {
        filterAndSortPosts();
    });

    await fetchAndDisplayAllPosts();
});





