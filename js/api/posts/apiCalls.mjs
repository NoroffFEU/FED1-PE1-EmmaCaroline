
import { authFetch } from '../auth/authFetch.mjs';
import { API_BASE_URL } from '../constants.mjs';

const DEFAULT_NAME = "emma_caroline";

export async function createBlogPost(post) {
    const response = await authFetch(`${API_BASE_URL}/blog/posts/${DEFAULT_NAME}`, {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return response;
}

export async function getAllPosts(name = DEFAULT_NAME) {
    const endpoint = `${API_BASE_URL}/blog/posts/${name}`;
    const response = await authFetch(endpoint);
    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error('Failed to fetch posts');
    }
    return responseBody;
}

export async function getSinglePost(id, name = DEFAULT_NAME) {
    const endpoint = `${API_BASE_URL}/blog/posts/${name}/${id}`;
    const response = await authFetch(endpoint);
    if (!response.ok) {
        throw new Error('Failed to fetch post');
    }
    const post = await response.json();

    if (post.body === null) {
        post.body = 'No content available'; 
    }

    return post;
}

export async function deleteBlogPost(id, name = DEFAULT_NAME) {
    const endpoint = `${API_BASE_URL}/blog/posts/${name}/${id}`;
    const response = await authFetch(endpoint, {
        method: 'DELETE'
    });

    return response;
}

export async function updateBlogPost(postData, name = DEFAULT_NAME) {
    const endpoint = `${API_BASE_URL}/blog/posts/${name}/${postData.id}`;
    const response = await authFetch(endpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    });

    const responseBody = await response.json();

    if (!response.ok) {
        throw new Error(`Failed to update post: ${responseBody.errors ? responseBody.errors[0].message : ''}`);
    }

    return responseBody;
}
