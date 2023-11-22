const {checkUserName, checkUserEmail, checkUserPassword} = require("../helpers/endpointHelpers.js")

test('checkname ', () => {
    //test name
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

    // Test Email
    expect(checkUserEmail("john.doe@example.com")).toBe(true);
    expect(checkUserEmail("invalid.email")).toBe(false);
    expect(checkUserEmail("john.doe@example")).toBe(false);

    expect(checkUserPassword(null)).toBe(false);
    expect(checkUserPassword(undefined)).toBe(false);
    expect(checkUserPassword("12345")).toBe(false); 
    expect(checkUserPassword("weak")).toBe(false); 
    expect(checkUserPassword("strongPassword123")).toBe(true);


})

