import { nameValidation } from "../src/client/js/InputTesting/nameValidation";

describe("Testing username input validation", () => {
  test("Testing for no input from user", () => {
    expect(nameValidation()).toBe("Anonymous");
  });
  test("Testing for input from user", () => {
    expect(nameValidation("Username")).toBeTruthy;
  });
});