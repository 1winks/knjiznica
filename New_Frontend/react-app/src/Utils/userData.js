import {jwtDecode} from "jwt-decode";

export function getUserData() {
    return JSON.parse(localStorage.getItem("userData"));
}

export function getJwt() {
    const token = getUserData().accessToken;
    return jwtDecode(token);
}
