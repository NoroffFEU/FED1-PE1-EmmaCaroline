import { getSinglePost, updateBlogPost } from '../posts/apiCalls.mjs';

export async function setUpdatePostFormListener() {
    const form = document.querySelector("#editPostForm");

    const url = new URL(location.href);
    const id = url.searchParams.get("id");

    if (form) {
        try {
            const postResponse = await getSinglePost(id);
            const post = postResponse.data; // Access the data property
            
            console.log('Post data:', post); // Log post data for debugging

            // Populate form fields
            form.title.value = post.title || ''; 
            form.media.value = post.media ? post.media.url : '';
            form.body.value = post.body || '';

            form.addEventListener("submit", async (event) => {
                event.preventDefault();
                const formData = new FormData(form);
                const updatedPost = Object.fromEntries(formData.entries());
                updatedPost.id = id; // Ensure the post ID is included

                // Construct the payload ensuring only provided fields are included
                const payload = {
                    id: updatedPost.id,
                    title: updatedPost.title,
                    body: updatedPost.body || '', // Optional field
                    tags: [] // Optional field, provide a default empty array
                };

                // Include media object only if the media URL is provided and valid
                if (updatedPost.media) {
                    try {
                        new URL(updatedPost.media); // Validate URL
                        payload.media = {
                            url: updatedPost.media,
                            alt: "" // Provide a default value or get from a form input if available
                        };
                    } catch {
                        console.warn("Invalid media URL, omitting from payload");
                    }
                }

                // Log the payload to be sent to the server
                console.log("Payload to be sent:", JSON.stringify(payload));

                try {
                    const updatedResponse = await updateBlogPost(payload);
                    // Handle success: show a success message or update UI
                    console.log("Post updated successfully:", updatedResponse);
                    window.location.href = `../post/index.html?id=${id}`; // Corrected redirection URL
                    alert("Post updated successfully!"); // Alert for successful update
                } catch (error) {
                    // Handle error: show an error message or log the error
                    console.error("Failed to update post:", error.message);
                }
            });
        } catch (error) {
            console.error("Failed to fetch post:", error.message);
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setUpdatePostFormListener();
});









