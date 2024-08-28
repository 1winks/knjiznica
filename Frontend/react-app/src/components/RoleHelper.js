export default function getRole(role) {
    let strRole;
    switch (role) {
        case "ROLE_ADMIN":
            strRole = "Admin";
            break;
        case "ROLE_MODERATOR":
            strRole = "Moderator";
            break;
        default:
            strRole = "User";
    }
    return strRole;
}