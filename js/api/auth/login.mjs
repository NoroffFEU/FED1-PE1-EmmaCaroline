
import { API_BASE_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

const action = "/auth/login";
const method = "post";

export function checkAuthentication() {
    const accessToken = storage.load("token");

    if (accessToken) {
        document.getElementById('createPostLink').style.display = 'block';
        document.getElementById('logOffLink').style.display = 'block';
    } else {
        document.getElementById('createPostLink').style.display = 'none';
        document.getElementById('logOffLink').style.display = 'none';
    }
}

export async function login(profile) {
    const loginURL = API_BASE_URL + action;
    const body = JSON.stringify(profile);

    try {
        const response = await fetch(loginURL, {
            headers: {
                "Content-Type": "application/json"
            },
            method,
            body
        });

        const result = await response.json();

        if (response.ok) {
            const { accessToken, ...user } = result.data;

            storage.save("token", accessToken);
            storage.save("profile", user);

            alert("You are now logged in");

            window.location.href = "../index.html";

        } else {
            alert("Login failed: " + result.message);
        }
    } catch (error) {
        alert("An error occurred. Please try again later.");
    }
}

export function setLoginFormListener() {
    const form = document.querySelector("#loginForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const profile = Object.fromEntries(formData.entries());

        await login(profile);

        checkAuthentication();
    });
}