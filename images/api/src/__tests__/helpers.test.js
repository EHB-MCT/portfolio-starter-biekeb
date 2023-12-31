const {
  checkUserName,
  checkUserEmail,
  checkUserPassword,
  checkUserAge,
  checkUserRole,
} = require("../helpers/endpointHelpers.js");

test("checkname ", () => {
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

  // Test Password
  expect(checkUserPassword(null)).toBe(false);
  expect(checkUserPassword(undefined)).toBe(false);
  expect(checkUserPassword("12345")).toBe(false);
  expect(checkUserPassword("weak")).toBe(false);
  expect(checkUserPassword("strongPassword123")).toBe(true);
});

//Test age
test("checkage", () => {
  expect(checkUserAge(null)).toBe(false);
  expect(checkUserAge(undefined)).toBe(false);
  expect(checkUserAge("25")).toBe(false);
  expect(checkUserAge(-5)).toBe(false);
  expect(checkUserAge(25)).toBe(true);
});

test("check role", () => {
  // Test valid roles
  expect(checkUserRole("user")).toBe(true);
  expect(checkUserRole("admin")).toBe(true);

  // Test invalid roles
  expect(checkUserRole("")).toBe(false);
  expect(checkUserRole(null)).toBe(false);
  expect(checkUserRole(undefined)).toBe(false);
  expect(checkUserRole("moderator")).toBe(false);
  expect(checkUserRole(123)).toBe(false);
});
