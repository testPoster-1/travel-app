import { destValidation } from "../src/client/js/InputTesting/destValidation";

document.body.innerHTML = `
    <div id="err-holder"></div>
    <div id="img-holder"></div>
  `; //creating the err-holder and img-holder divs just so that the jest can test them. These ids are used in the actual function, but Jest can't access them, need to create them here. 
window.HTMLElement.prototype.scrollIntoView = function () { }; //scrollintoview is not in the JestDOM so not considered a function, so include this line to indicate that it is specifically a function. 


describe("Validating user input for destination", () => {
  test("Testing for no input from user", () => {
    expect(destValidation("")).toBeFalse;
  });
  test("Testing for no input from user", () => {
    expect(destValidation(2)).toBeFalse;
  });
  test("Testing for any location input from user", () => {
    expect(destValidation("Chicago")).toBeTruthy;
  });
});