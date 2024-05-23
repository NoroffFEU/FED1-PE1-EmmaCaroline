
import { login } from "../api/auth/login.mjs";

export function setLoginFormListener() {
    const form = document.querySelector("#loginForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault()  //don't know if i want to use this
        const form = event.target;
        const formData = new FormData(form);
        const profile = Object.fromEntries(formData.entries())

        //send it to the api:
        login(profile)
    })
}