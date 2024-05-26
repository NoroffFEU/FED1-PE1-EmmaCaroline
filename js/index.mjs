
import { checkAuthentication } from "./api/auth/login.mjs";
import { setRegisterFormListener } from "./api/auth/register.mjs";
import { setLoginFormListener } from "./api/auth/login.mjs";

const path = location.pathname;

document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();

    if (path === '/account/login.html') {
        setLoginFormListener();
    } else if (path === '/account/register.html') {
        setRegisterFormListener();
    }
});







