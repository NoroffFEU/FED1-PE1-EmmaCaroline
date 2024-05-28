
import { API_BASE_URL } from "../constants.mjs";

const action = "/auth/register";
const method = "post";

export async function register(profile) {
    const registerURL = API_BASE_URL + action;
    console.log('Register URL:', registerURL);
    console.log('Profile:', profile);
    const body = JSON.stringify(profile);

    try {
        const response = await fetch(registerURL, {
            headers: {
                "Content-Type": "application/json"
            },
            method,
            body
        });

        console.log('Response status:', response.status); // Debug response status

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Failed to register:', errorText);
            throw new Error('Failed to register: ' + errorText);
        }

        const result = await response.json();
        console.log('Registration result:', result); // Debug result
        alert("You are now registered");
        return result;
    } catch (error) {
        console.error('Error:', error);
        alert('Registration failed');
    }
}

export function setRegisterFormListener() {
    const form = document.querySelector("#registerForm");

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const profile = Object.fromEntries(formData.entries());

        //send it to the api:
        register(profile);
    });
}