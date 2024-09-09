import { API_BASE_URL } from "../constants.mjs";

const action = "/auth/register";
const method = "post";

export async function register(profile) {
  const registerURL = API_BASE_URL + action;
  const body = JSON.stringify(profile);

  try {
    const response = await fetch(registerURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Failed to register: " + errorText);
    }

    const result = await response.json();
    alert("You are now registered");
    return result;
  } catch (error) {
    alert("Registration failed");
  }
}

export function setRegisterFormListener() {
  const form = document.querySelector("#registerForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    register(profile);
  });
}
