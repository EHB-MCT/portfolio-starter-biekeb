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

module.exports = {
    checkUserName
}