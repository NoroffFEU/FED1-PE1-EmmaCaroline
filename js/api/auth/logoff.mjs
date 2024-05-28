
import { clearToken } from "./authFetch.mjs";

export function logOff() {
    clearToken();
    window.location.href = "/FED1-PE1-EMMACAROLINE/index.html";
}