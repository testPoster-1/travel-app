import { destValidation } from "../src/client/js/InputTesting/destValidation";

describe("Validating user input for destination", () => {
  test("Testing for no input from user", () => {
    expect(destValidation(",,")).toBeFalse;
  });
  test("Testing for no input from user", () => {
    expect(destValidation(" ,,")).toBeFalse;
  });
  test("Testing for no input from user", () => {
    expect(destValidation(",, ")).toBeFalse;
  });
  test("Testing for any location input from user", () => {
    expect(destValidation("Chicago,, ")).toBeTruthy;
  });
  test("Testing for any location input from user", () => {
    expect(destValidation(",Illinois, ")).toBeTruthy;
  });
  test("Testing for any location input from user", () => {
    expect(destValidation(",,France")).toBeTruthy;
  });
});