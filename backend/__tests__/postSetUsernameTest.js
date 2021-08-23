require("dotenv").config({ path: ".env.test" });
const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
require("./util/inMemDb");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

it("checks if a post request to /api/set-username returns status(200) and message 'Username updated', and updates username, when the correct characters are used to set new username", async () => {
  // given
  const newUser = new User({
    google_id: 1,
    given_name: "What",
    family_name: "Ever",
    picture: "P",
    email: "e@m.il",
    "apis.people_in_space": true,
  });
  await newUser.save();

  const token = jwt.sign({ google_id: 1 }, process.env.JWT_SECRET);

  // when
  const response = await request.post("/api/set-username").set("Authorization", `Bearer ${token}`).send({
    username: "newusername1",
  });

  const user = await User.findOne({ google_id: 1 });

  // then
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Username updated");
  expect(user.username).toBe("newusername1");
});

it("checks if a post request to /api/set-username returns status(406) and message 'Username updated', and updates username, when the correct characters are used to set new username", async () => {
  // given
  const newUser = new User({
    google_id: 1,
    given_name: "What",
    family_name: "Ever",
    picture: "P",
    email: "e@m.il",
    "apis.people_in_space": true,
  });
  await newUser.save();

  const token = jwt.sign({ google_id: 1 }, process.env.JWT_SECRET);

  // when
  const response = await request.post("/api/set-username").set("Authorization", `Bearer ${token}`).send({
    username: "ÉÁÍÓŰ",
  });

  await User.findOne({ google_id: 1 });

  // then
  expect(response.status).toBe(406);
  expect(response.body.message).toBe("Not acceptable, numbers and English letters only");
});

it("checks if a post request to /api/set-username returns status(400) and message 'Username already taken', and does not update username, when an already existing username is used to set a new username", async () => {
  // given
  const newUser = new User({
    google_id: 1,
    given_name: "What",
    family_name: "Ever",
    picture: "P",
    email: "e@m.il",
    "apis.people_in_space": true,
    username: "AlreadyTakenUsername",
  });
  await newUser.save();

  const token = jwt.sign({ google_id: 1 }, process.env.JWT_SECRET);

  // when
  const response = await request.post("/api/set-username").set("Authorization", `Bearer ${token}`).send({
    username: "AlreadyTakenUsername",
  });

  const user = await User.findOne({ google_id: 1 });

  // then
  expect(response.status).toBe(400);
  expect(response.body.message).toBe("Username already taken");
  expect(user.username).toBe("AlreadyTakenUsername");
});

it("checks if a post request to /api/set-username returns status(404) and the message 'User not found', when the user is deleted from the database after sending the request", async () => {
  // given
  // user has a token at this point, but is deleted after sending the request

  const token = jwt.sign({ google_id: 1 }, process.env.JWT_SECRET);

  // when
  const response = await request.post("/api/set-username").set("Authorization", `Bearer ${token}`).send({
    username: "NewUsername",
  });

  await User.findOne({ google_id: 1 });

  // then
  expect(response.status).toBe(404);
  expect(response.body.message).toBe("User not found");
});
