
import * as listeners from "./handlers/index.mjs";
import * as templates from "./templates/index.mjs";
import * as postMethods from "./api/posts/index.mjs";


const path = location.pathname;

if (path === '/account/login.html') {
    listeners.setLoginFormListener()
} else if (path === '/account/register.html') {
    listeners.setRegisterFormListener()
}


// test function (#post targeter parent div fra html som template posts skal ligge i, posts.pop() gets the last post)
/*async function testTemplate() {
    const posts = await postMethods.getPosts();
    const post = posts.pop()
    const container = document.querySelector("#post");
    templates.renderPostTemplate(post, container);
}*/

/*post.createPost()
post.updatePost()
post.removePost()
post.getPost()
post.getPosts()*/







