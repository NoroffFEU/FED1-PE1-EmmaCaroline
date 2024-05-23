
import { createPost } from "../api/posts/index.mjs";

export function setCreatePostFormListener() {
    const form = document.querySelector("#createPost");

    if (form) {
        form.addEventListener("submit", (event) => {
            event.preventDefault()  //don't know if i want to use this
            const form = event.target;
            const formData = new FormData(form);
            const post = Object.fromEntries(formData.entries())
    
            //send it to the api:
            createPost(post)
        })
    }
}