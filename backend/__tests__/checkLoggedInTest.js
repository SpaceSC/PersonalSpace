require("dotenv").config({ path: ".env.test" });
const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
require("./util/inMemDb");
const jwt = require("jsonwebtoken");
const User = require('../models/userModel');

it("checks if a get request to /api/check-logged-in returns status(404) and message 'User not found' when user is deleted from database after sending the request", async () => {
  // given
  // user has a token at this point, but is deleted after sending the request
  const token = jwt.sign({ google_id: 1 }, process.env.JWT_SECRET);

  // when
  const response = await request.get("/api/check-logged-in").set("Authorization", `Bearer ${token}`)

  // then
  expect(response.status).toBe(404);
  expect(response.body.message).toBe("User not found");
});

it("checks if a get request to /api/check-logged-in  returns status(200) and an object with the api statuses ", async () => {
  // given
  const newUser = new User({
    google_id: 1,
    given_name: "What",
    family_name: "Ever",
    picture: "P",
    email: "e@m.il",
    "apis.people_in_space": false,
  });
  await newUser.save();

  const token = jwt.sign({ google_id: 1 }, process.env.JWT_SECRET);

  // when
  const response = await request.get("/api/check-logged-in").set("Authorization", `Bearer ${token}`)

  const user = await User.findOne({ google_id: 1 });

  // then
  expect(response.status).toBe(200);
  expect(response.body).toEqual({ apiStatuses: user.apis });
});