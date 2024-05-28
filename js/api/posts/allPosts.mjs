
import { getAllPosts } from '../posts/apiCalls.mjs';

document.addEventListener('DOMContentLoaded', async () => {
    const thumbnailGrid = document.getElementById('thumbnailGrid');

    async function displayAllPosts() {
        try {
            const { data: posts } = await getAllPosts();
            if (!Array.isArray(posts)) {
                return;
            }
            thumbnailGrid.innerHTML = '';
            posts.forEach(post => {
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
        } catch (error) {
            alert("Failed to fetch posts");
        }
    }

    await displayAllPosts();
});