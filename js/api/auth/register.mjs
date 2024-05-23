
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

        if (!response.ok) {
            throw new Error('Failed to register');
        }

        const result = await response.json();
        alert("You are now registered");
        return result;
    } catch (error) {
        console.error('Error:', error);
        alert('Registration failed');
    }
}