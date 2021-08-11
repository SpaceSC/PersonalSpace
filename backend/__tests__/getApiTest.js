const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);

it("Returns a message when get request is sent to /api/test endpoint", async () => {
  // given
  // app has started

  // when
  const response = await request.get("/api/test");

  // then
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("My test endpoint");
});
