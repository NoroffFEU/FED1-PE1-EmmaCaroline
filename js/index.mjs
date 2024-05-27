
/*import { checkAuthentication } from "../js/api/auth/login.mjs";
import { setRegisterFormListener } from "../js/api/auth/register.mjs";
import { setLoginFormListener } from "../js/api/auth/login.mjs";

const path = location.pathname;

document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();

    if (path === '/account/login.html') {
        setLoginFormListener();
    } else if (path === '/account/register.html') {
        setRegisterFormListener();
    }
});*/




import { checkAuthentication } from "../js/api/auth/login.mjs";
import { setRegisterFormListener } from "../js/api/auth/register.mjs";
import { setLoginFormListener } from "../js/api/auth/login.mjs";

const path = location.pathname;
console.log('Current Path:', path); // Debug current path

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded');
    checkAuthentication();

    if (path.includes('/account/login.html')) {
        console.log('Setting login form listener');
        setLoginFormListener();
    } else if (path.includes('/account/register.html')) {
        console.log('Setting register form listener');
        setRegisterFormListener();
    }
});







