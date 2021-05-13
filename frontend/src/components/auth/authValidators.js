const usernameValidator = (value) => {
    for (const ch in value) {
        if (!('a' <= ch <= 'z' || 'A' <= ch <= 'Z' || '0' <= ch <= '0' || ch != ' ')) {
            return false;
        }
    }
    return true;
}
const fullNameValidator = (value) => {
    for (const ch of value) {
        if (!('a' <= ch <= 'z' || 'A' <= ch <= 'Z')) {
            return false;
        }
    }
    return true;
}
export {usernameValidator,fullNameValidator};