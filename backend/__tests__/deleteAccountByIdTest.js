require("dotenv").config({ path: ".env.test" });
const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
require("./util/inMemDb");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

it("checks if a delete request to /api/delete-account/:id returns status(200) and the message '<Deleteduser>'s account has been deleted.' ", async () => {
  // given
  const newUser = new User({
    google_id: 2,
    given_name: "What",
    family_name: "Ever",
    picture: "P",
    email: "e@m.il",
    "apis.people_in_space": false,
  });
  await newUser.save();

  const token = jwt.sign({ google_id: 1, is_admin: true }, process.env.JWT_SECRET);

  // when
  const response = await request.delete("/api/delete-account/2").set("Authorization", `Bearer ${token}`)

  // then
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("What's account has been deleted.");
});

it("checks if a delete request to /api/delete-account/:id returns status(401) and message 'Unauthorized' when user is not an admin", async () => {
  // given
  const token = jwt.sign({ google_id: 1 }, process.env.JWT_SECRET);

  // when
  const response = await request.delete("/api/delete-account/2").set("Authorization", `Bearer ${token}`)

  // then
  expect(response.status).toBe(401);
  expect(response.body.message).toBe("Unauthorized");
});

it("checks if a delete request to /api/delete-account/:id returns status(404) and message 'User not found' when user to be deleted is deleted from database by another authorized person after sending the request", async () => {
  //given

  const token = jwt.sign({ google_id: 1, is_admin: true  }, process.env.JWT_SECRET);

  //when
  const response = await request.delete("/api/delete-account/2").set("Authorization", `Bearer ${token}`)

  //then
  expect(response.status).toBe(404);
  expect(response.body.message).toBe("User not found");
});


