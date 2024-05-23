
import { getPost, updatePost } from "../api/posts/index.mjs";

export async function setUpdatePostFormListener() {
    const form = document.querySelector("#editPost");

    const url = new URL(location.href);
    const id = url.searchParams.get("id");

    if (form) {

        const post = await getPost(id);

        form.title.value = post.title;
        form.author.value = post.author;
        form.date.value = post.date; 
        form.media.value = post.media;
        form.body.value = post.body;

        form.addEventListener("submit", (event) => {
            event.preventDefault()  //don't know if i want to use this
            const form = event.target;
            const formData = new FormData(form);
            const post = Object.fromEntries(formData.entries())
            post.id = id;
    
            //send it to the api:
            updatePost(post)
        })
    }
}