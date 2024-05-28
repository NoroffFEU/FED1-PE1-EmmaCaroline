
import { checkAuthentication, setLoginFormListener } from "./api/auth/login.mjs";
import { setRegisterFormListener } from "./api/auth/register.mjs";
import { logOff } from "./api/auth/logoff.mjs";

const path = location.pathname;

document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();

    if (path.includes('/account/login.html')) {
        setLoginFormListener();
    } else if (path.includes('/account/register.html')) {
        setRegisterFormListener();
    }

    const logOffButton = document.getElementById('logOffLink');
    if (logOffButton) {
        logOffButton.addEventListener('click', (event) => {
            event.preventDefault();
            logOff();
        });
    }
});







