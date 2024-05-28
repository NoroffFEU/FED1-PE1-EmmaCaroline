
import { createBlogPost } from '../posts/apiCalls.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const createPostForm = document.getElementById('createPostForm');

    createPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(createPostForm);
        const post = Object.fromEntries(formData.entries());

        // Replace newline characters with HTML line breaks
        post.body = post.body.replace(/\n/g, '<br>');

        // Handle the media field as optional
        if (post.media) {
            post.media = {
                url: post.media,
                alt: post.title // Assuming you want to use the title as alt text
            };
        } else {
            delete post.media;
        }

        const response = await createBlogPost(post); // Use createBlogPost function

        if (response.ok) {
            alert('Post created successfully!');
            createPostForm.reset();
        } else {
            alert('Failed to create post.');
        }
    });
});