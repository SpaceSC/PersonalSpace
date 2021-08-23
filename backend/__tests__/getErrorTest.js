const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);

it("Returns a message when get request is sent to /api/error-test endpoint", async () => {
  // given
  // app has started

  // when
  const response = await request.get("/api/error-test");

  // then
  expect(response.status).toBe(500);
  expect(response.body.message).toBe("Internal server error");
  //error handler returns a different message than the throw
});