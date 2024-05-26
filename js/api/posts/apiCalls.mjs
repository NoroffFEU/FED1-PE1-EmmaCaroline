
import { authFetch } from '../authFetch.mjs';
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
    console.log('API Response for all posts:', responseBody);

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

    // Check if the "body" field is null and handle accordingly
    if (post.body === null) {
        post.body = 'No content available'; // Or any other message you prefer
    }

    console.log('Fetched single post:', post);
    return post;
}

export async function deleteBlogPost(id, name = DEFAULT_NAME) {
    const endpoint = `${API_BASE_URL}/blog/posts/${name}/${id}`;
    const response = await authFetch(endpoint, {
        method: 'DELETE'
    });

    return response;
}

/*export async function updateBlogPost(id, postData, name = DEFAULT_NAME) {
    const endpoint = `${API_BASE_URL}/blog/posts/${name}/${id}`;
    const response = await authFetch(endpoint, {
        method: 'PUT',
        body: JSON.stringify(postData),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to update post');
    }

    return response;
}*/

export async function updateBlogPost(postData, name = DEFAULT_NAME) {
    const endpoint = `${API_BASE_URL}/blog/posts/${name}/${postData.id}`;
    const response = await authFetch(endpoint, {
        method: 'put',
        body: JSON.stringify(postData)
    })

    if (!response.ok) {
        throw new Error('Failed to update post');
    }

    return await response.json();
}
