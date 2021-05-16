import { timeDifference } from "../src/client/js/getTime";

  let u = new Date();
  let testDay = u.getDate();

describe("Testing timeDifference function", () => {
  test("Calculate difference between dates", () => {
    expect(timeDifference(`${u.getFullYear()}-${u.getMonth() + 1}-${testDay+1}`)).toBe(0); //expect this one to pass
  });
  test("Calculate difference between dates", () => {
    expect(timeDifference(`${u.getFullYear()}-${u.getMonth() + 1}-${testDay-3}`)).toBe(-1); //expect this one to pass
  });
  test("Calculate difference between dates", () => {
    expect(timeDifference(`${u.getFullYear()}-${u.getMonth() + 1}-${testDay+7}`)).toBe(1); //expect this one to pass
  });
});