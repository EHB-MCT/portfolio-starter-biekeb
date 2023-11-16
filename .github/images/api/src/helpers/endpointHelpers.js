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
    // Use a simple regex for email validation (this is a basic example)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
        email == null ||
        typeof email !== "string" ||
        email.length > 255 || // Adjust the maximum length based on your requirements
        !emailRegex.test(email)
    ) {
        return false;
    }
    return true;
}

module.exports = {
    checkUserName,
    checkUserEmail
};
