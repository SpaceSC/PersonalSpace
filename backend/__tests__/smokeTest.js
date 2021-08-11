const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);

describe("Smoke tests", () => {
  it("Tests if Jest works", () => {
    expect(1).toBe(1);
  });

  it("Tests if supertest works", async () => {
    const response = await request.get("/api/something/does-not-exist")

    expect(response.status).toBe(404)
  })
});
