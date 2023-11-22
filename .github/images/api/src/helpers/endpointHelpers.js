function checkUserName(name){
    if (
        name == null ||
        typeof name !== "string" ||
        name.length < 3 ||
        name.length > 20 ||
        !/^[a-zA-Z]+$/.test(name)
        
    ) {
    return false;

    }
    return true
}

function checkUserEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
        email == null ||
        typeof email !== "string" ||
        email.length > 255 || 
        !emailRegex.test(email)
    ) {
        return false;
    }
    return true;
}

function checkUserPassword(password) {
    if (
        password == null ||
        typeof password !== "string" ||
        (password.length !== 0 && password.length < 6)
    ) {
        return false;
    }
    return true;
}


module.exports = {
    checkUserName,
    checkUserEmail,
    checkUserPassword
};
