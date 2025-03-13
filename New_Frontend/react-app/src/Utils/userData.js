import {jwtDecode} from "jwt-decode";


export function getJwt() {
    return localStorage.getItem("jwt");
}
export function decodeJwt() {
    return jwtDecode(getJwt());
}

export function getUsernameFromJwt() {
    return decodeJwt().sub;
}

export function clearJwt() {
    localStorage.removeItem("jwt");
}