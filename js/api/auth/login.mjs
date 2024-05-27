
import { API_BASE_URL } from "../js/api/constants.mjs";
import * as storage from "../js/storage/index.mjs";

const action = "/auth/login";
const method = "post";

export function checkAuthentication() {
    const accessToken = storage.load("token");

    if (accessToken) {
        document.getElementById('createPostLink').style.display = 'block';
    } else {
        document.getElementById('createPostLink').style.display = 'none';
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

            // Redirect to the homepage after successful login
            window.location.href = "../index.html";

        } else {
            alert("Login failed: " + result.message);
        }
    } catch (error) {
        console.error("Error during login:", error);
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

        // Send it to the API:
        await login(profile);

        // Check authentication to show/hide elements based on login status
        checkAuthentication();
    });
}