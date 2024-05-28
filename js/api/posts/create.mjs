
import { createBlogPost } from '../posts/apiCalls.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const createPostForm = document.getElementById('createPostForm');

    createPostForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(createPostForm);
        const post = Object.fromEntries(formData.entries());

        post.body = post.body.replace(/\n/g, '<br>');

        if (post.media) {
            post.media = {
                url: post.media,
                alt: post.title 
            };
        } else {
            delete post.media;
        }

        const response = await createBlogPost(post); 

        if (response.ok) {
            alert('Post created successfully!');
            createPostForm.reset();
        } else {
            alert('Failed to create post.');
        }
    });
});