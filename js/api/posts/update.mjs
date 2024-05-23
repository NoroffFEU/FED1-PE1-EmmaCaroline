
import { API_BASE_URL } from "../constants.mjs";

import { authFetch } from "../authFetch.mjs";

const action = "/blog/posts";
const method = "put";

export async function updatePost(postData) {
    const updatePostURL = `${API_BASE_URL}${action}/${postData.id}`;

    const response = await authFetch(updatePostURL, {
        method,
        body: JSON.stringify(postData)
    })

    return await response.json();
}