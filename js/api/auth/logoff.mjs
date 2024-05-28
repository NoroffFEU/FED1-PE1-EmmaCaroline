
import { clearToken } from "./authFetch.mjs";

export function logOff() {
    clearToken();
    window.location.href = "index.html";
}