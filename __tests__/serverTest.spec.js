const request = require("supertest"); //need to install supertest for endpoint testing
const app = require( "../src/server/serverTest.js");
import 'regenerator-runtime/runtime'; //needed for running async/await in testing

describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    const response = await request(app).get("/"); //notice that the get("/") path needs to match with the testserver 
    expect(response.statusCode).toBe(200);
  });
});