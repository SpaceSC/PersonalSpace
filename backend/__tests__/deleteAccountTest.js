require("dotenv").config({ path: ".env.test" });
const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
require("./util/inMemDb");
const jwt = require("jsonwebtoken");
const User = require('../models/userModel');

it("checks if a delete request to /api/delete-account returns status(200) and the message '<Deleteduser>'s account has been deleted.' ", async () => {
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

  const user = await User.findOne({ google_id: 1 });

  // when
  const response = await request.delete("/api/delete-account").set("Authorization", `Bearer ${token}`)

  // then
  expect(response.status).toBe(200);
  expect(response.body.message).toBe(`${user.given_name}'s account has been deleted.`);
});

it("checks if a delete request to /api/delete-account returns status(404) and message 'User not found' when the database is empty", async () => {
  // given
  // user has a token at this point, but is deleted after sending the request
  const token = jwt.sign({ google_id: 1 }, process.env.JWT_SECRET);

  // when
  const response = await request.delete("/api/delete-account").set("Authorization", `Bearer ${token}`)
  
  // then
  expect(response.status).toBe(404);
  expect(response.body.message).toBe("User not found");
});