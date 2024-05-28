
import { getSinglePost, updateBlogPost } from '../posts/apiCalls.mjs';

export async function setUpdatePostFormListener() {
    const form = document.querySelector("#editPostForm");

    const url = new URL(location.href);
    const id = url.searchParams.get("id");

    if (form && id) {
        try {
            const postResponse = await getSinglePost(id);
            const post = postResponse.data; 

            form.title.value = post.title || ''; 
            form.media.value = post.media ? post.media.url : '';
            form.body.value = post.body || '';

            form.addEventListener("submit", async (event) => {
                event.preventDefault();
                const formData = new FormData(form);
                const updatedPost = Object.fromEntries(formData.entries());
                updatedPost.id = id; 

                const payload = {
                    id: updatedPost.id,
                    title: updatedPost.title,
                    body: updatedPost.body || '', 
                    tags: [], 
                    created: new Date(post.created).toISOString() 
                };

                if (updatedPost.media) {
                    try {
                        new URL(updatedPost.media); 
                        payload.media = {
                            url: updatedPost.media,
                            alt: "" 
                        };
                    } catch {
                        console.warn("Invalid media URL, omitting from payload");
                    }
                }

                const updatedResponse = await updateBlogPost(payload);
                alert("Post updated successfully!"); 
                window.location.href = `../post/index.html?id=${id}`;
                
                const updateDateElement = document.getElementById('updateDate');
                updateDateElement.textContent = `Updated: ${new Date().toLocaleDateString()}`;
                updateDateElement.style.display = 'block';
            });
        } catch (error) {
            console.error("Failed to fetch post:", error.message);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setUpdatePostFormListener();
});










