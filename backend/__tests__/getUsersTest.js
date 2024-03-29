require("dotenv").config({ path: ".env.test" });
const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
require("./util/inMemDb");
const jwt = require("jsonwebtoken");
const User = require('../models/userModel');

it("checks if a get request to /api/user-list returns status(200) and all the users", async () => {
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
  const response = await request.get("/api/user-list").set("Authorization", `Bearer ${token}`)

  const users = await User.find({});

  // then
  expect(response.status).toBe(200);
  expect(JSON.stringify(response.body[0])).toBe(JSON.stringify({_id: users[0]._id, given_name: users[0].given_name, picture: users[0].picture}));
});

it("checks if a get request to /api/user-list returns status(404) and message 'Users not found' when the database is empty", async () => {
  // given
  // user has a token at this point, but is deleted after sending the request
  const token = jwt.sign({ google_id: 1 }, process.env.JWT_SECRET);

  // when
  const response = await request.get("/api/user-list").set("Authorization", `Bearer ${token}`)

  // then
  expect(response.status).toBe(404);
  expect(response.body.message).toBe("Users not found");
});