import { timeDifference } from "../src/client/js/InputTesting/dateValidation";

document.body.innerHTML = `
    <div id="err-holder"></div>
    <div id="img-holder"></div>
  `; //creating the err-holder and img-holder divs just so that the jest can test them. These ids are used in the actual function, but Jest can't access them, need to create them here. 
window.HTMLElement.prototype.scrollIntoView = function () { }; //scrollintoview is not in the JestDOM so not considered a function, so include this line to indicate that it is specifically a function. 

let u = new Date();
let testDay = u.getDate();
let a = "";

describe("Testing timeDifference function", () => {
  test("Calculate difference between dates", () => {
    expect(timeDifference(`${u.getFullYear()}-${u.getMonth() + 1}-${testDay + 1}`, `${u.getFullYear()}-${u.getMonth() + 1}-${testDay + 2}` )).toBe(3); //input is 6 days or less
  });
  test("Calculate difference between dates", () => {
    expect(timeDifference(`${u.getFullYear()}-${u.getMonth() + 1}-${testDay - 3}`, `${u.getFullYear()}-${u.getMonth() + 1}-${testDay + 1}`)).toBeFalse; //input is in the past
  });
  test("Calculate difference between dates", () => {
    expect(timeDifference(`${u.getFullYear()}-${u.getMonth() + 1}-${testDay + 7}`, `${u.getFullYear()}-${u.getMonth() + 1}-${testDay + 8}`)).toBe(7); //input is 7
  });
  test("Calculate difference between dates", () => {
    expect(timeDifference(`${u.getFullYear()}-${u.getMonth() + 1}-${testDay + 7}`, a)).toBeFalse; //input is 7
  });
  test("Calculate difference between dates", () => {
    expect(timeDifference(a, `${u.getFullYear()}-${u.getMonth() + 1}-${testDay + 7}`)).toBeFalse; //input is 7
  });
  test("Calculate difference between dates", () => {
    expect(timeDifference(a, a)).toBeFalse; //input is 7
  });
});
