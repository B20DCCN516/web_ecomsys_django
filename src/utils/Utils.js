
export function getUser() {
    var userJson = sessionStorage.getItem("user");
    var user = null
    if (userJson) {
        user = JSON.parse(userJson);
    }
    return user
}