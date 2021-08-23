require("dotenv").config({ path: ".env.test" });
const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const jwt = require("jsonwebtoken");
const fetch = require("node-fetch");
require("./util/inMemDb");
jest.mock("node-fetch");

it("tests google login", async () => {
  // given
  const id_token = jwt.sign({ sub: 1, given_name: "A", family_name: "B", email: "C", picture: "D"  }, process.env.JWT_SECRET);
  console.log(id_token)


  fetch.mockImplementation(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({id_token})
    })
  );
  
  // when
  const response = await request.post("/api/login").send({
    code: "valid"
  });
  console.log(response.body)

  // then
  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty("token");
  expect(response.body).toHaveProperty("apiStatuses");
});

it("tests if google login returns status 400 and the message 'Invalid code'", async () => {
  // given

  fetch.mockImplementation(() =>
  Promise.resolve({
    status: 400,
    json: () => Promise.resolve({})
    })
  );
  
  // when
  const response = await request.post("/api/login").send({
    code: "invalid"
  });

  // then
  expect(response.status).toBe(400);
  expect(response.body.message).toBe("Invalid code");
});


