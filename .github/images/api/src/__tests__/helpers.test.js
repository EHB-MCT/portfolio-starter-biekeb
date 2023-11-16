const {checkUserName} = require("../helpers/endpointHelpers.js")

test('checkname ', () => {
    expect(checkUserName("")).toBe(false);
    expect(checkUserName(null)).toBe(false);
    expect(checkUserName(undefined)).toBe(false);
    expect(checkUserName(123)).toBe(false);
    expect(checkUserName("a")).toBe(false);
    expect(checkUserName("aaaaaaaaaaaaaaaaaaaaa")).toBe(false);

    expect(checkUserName("!@#$%^")).toBe(false);
    expect(checkUserName("JohnDoe")).toBe(true);
    expect(checkUserName("user name")).toBe(false);
    expect(checkUserName("JohnDoe123")).toBe(false); 
    

})