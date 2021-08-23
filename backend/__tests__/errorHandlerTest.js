const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const errorHandler = require('../middleware/errorHandler');
const fetch = require("node-fetch");
jest.mock("node-fetch");

it("tests if errorHandler middleware works", async () => {
  // given
  // mockError.mockImplementation(() => {
  //   throw new Error("Internal server error");
  // });
  res = {
    send: function(){ },
    json: function(err){
    },
    status: function(responseStatus) {
        assert.equal(responseStatus, 404);
        // This next line makes it chainable
        return this; 
    }
}

  // when
  errorHandler();

  // then
  expect(response.status).toBe(500);
  expect(response.body.message).toBe("Internal server error");
});