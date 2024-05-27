
import { load } from "../js/storage/index.mjs";

export function headers() {
    const token = load("token");
    console.log('Token:', token); // Debug token

    return {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
    }
}

export async function authFetch(url, options) {
    console.log('Fetch URL:', url); // Debug URL
    return fetch(url, {
        ...options,
        headers: headers()
    });
}