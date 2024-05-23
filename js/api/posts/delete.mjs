
import { API_BASE_URL } from "../constants.mjs";

import { authFetch } from "../authFetch.mjs";

const action = "/blog/posts";
const method = "delete";

export async function removePost(id) {

    if (!id) {
        throw new Error("Delete requires a postID");
    }

    const updatePostURL = `${API_BASE_URL}${action}/${id}`;

    const response = await authFetch(updatePostURL, {
        method
    })

    return await response.json();
}