
import { API_BASE_URL } from "../constants.mjs";

import { authFetch } from "../authFetch.mjs";

const action = "/blog/posts";

export async function getPosts() { // have to use this to get all the thumbnail images?
    const updatePostURL = `${API_BASE_URL}${action}`;

    const response = await authFetch(updatePostURL)

    return await response.json();
}

export async function getPost(id) {
    if (!id) {
        throw new Error("Get requires a postID");
    }

    const getPostURL = `${API_BASE_URL}${action}/${id}`;

    const response = await authFetch(getPostURL)

    return await response.json();
}