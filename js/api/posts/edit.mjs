
import { getSinglePost, updateBlogPost } from '../posts/apiCalls.mjs';

/*document.addEventListener('DOMContentLoaded', async () => {
    const editform = document.getElementById('editPostForm');

    const url = new URL(location.href);
    const id = url.searchParams.get("id");
    const DEFAULT_NAME = "emma_caroline";

    if (editform) {
        try {
            const { data: postData } = await getSinglePost(DEFAULT_NAME, id); // Destructure the 'data' object from the response

            // Populate form fields with post data
            editform.title.value = postData.title; 
            editform.body.value = postData.body;

            // Check if media exists before setting its value
            if (postData.media) {
                editform.media.value = postData.media.url; // Access the 'url' property of the 'media' object
            }

            editform.addEventListener('submit', async (event) => {
                event.preventDefault();
                const formData = new FormData(editform);
                const updatedData = Object.fromEntries(formData.entries()); // Rename to 'updatedData' to avoid variable name conflict
                updatedData.id = id;

                const response = await updateBlogPost(id, updatedData); // Pass 'id' and 'updatedData' as arguments

                if (response.ok) {
                    alert('Post updated successfully!');
                    editform.reset();
                } else {
                    alert('Failed to update post.');
                }
            });
        } catch (error) {
            console.error('Failed to fetch post data:', error);
        }
    }
});*/







export async function setUpdatePostFormListener() {
    const form = document.querySelector("#editPostForm");

    const url = new URL(location.href);
    const id = url.searchParams.get("id");

    if (form) {

        const post = await getSinglePost(id);

        form.title.value = post.title; 
        form.media.value = post.media;
        form.body.value = post.body;

        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            const formData = new FormData(form);
            const post = Object.fromEntries(formData.entries());
            post.id = id;
            try {
                const updatedPost = await updateBlogPost(post);
                // Handle success: show a success message or update UI
                console.log("Post updated successfully:", updatedPost);
            } catch (error) {
                // Handle error: show an error message or log the error
                console.error("Failed to update post:", error.message);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    setUpdatePostFormListener();
});

//COULD TRY CALLING THE DISPLAYPOSTS INSTEAD OF GETPOST 









