
import { API_BASE_URL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

const action = "/auth/login";
const method = "post";

export async function login(profile) {
    const loginURL = API_BASE_URL + action;
    const body = JSON.stringify(profile);

    const response = await fetch(loginURL, {
        headers: {
            "Content-Type": "application/json"
        },
        method,
        body
    })

    const result = await response.json();

    const { accessToken, ...user } = result.data;
    
    storage.save("token", accessToken)

    storage.save("profile", user)

    alert("You are now logged in")
}