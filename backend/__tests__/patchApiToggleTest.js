require("dotenv").config({ path: ".env.test" });
const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
require("./util/inMemDb");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

it("checks if a patch request without an authorization token in headers returns status(401)", async () => {
  // given
  // app has started

  // when
  const response = await request.patch("/api/toggle-api-status").send({
    status: true,
    api: "people_in_space",
  });

  // then
  expect(response.status).toBe(401);
});

it("checks if a patch request to toggle api status returns status(404) and message 'User not found' when user is not found in database (user is deleted from the database after sending the request)", async () => {
  // given
  const token = jwt.sign({ google_id: 1 }, process.env.JWT_SECRET);

  // when
  const response = await request.patch("/api/toggle-api-status").set("Authorization", `Bearer ${token}`).send({
    status: true,
    api: "people_in_space",
  });

  // then
  expect(response.status).toBe(404);
  expect(response.body.message).toBe("User not found");
});

it("checks if a patch request to toggle api status returns status(200) and message 'Api status updated' when default status is being toggled", async () => {
  // given
  const newUser = new User({ google_id: 1, given_name: "What", family_name: "Ever", picture: "P", email: "e@m.il" });
  await newUser.save();

  const userApiStatus = await User.findOne({ google_id: 1 });
  const apiDefaultStatus = userApiStatus.apis.people_in_space;

  const token = jwt.sign({ google_id: 1 }, process.env.JWT_SECRET);

  // when
  const response = await request.patch("/api/toggle-api-status").set("Authorization", `Bearer ${token}`).send({
    status: !apiDefaultStatus,
    api: "people_in_space",
  });

  const user = await User.findOne({ google_id: 1 });

  // then
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Api status updated");
  expect(newUser.apis.people_in_space).toBe(apiDefaultStatus);
  expect(user.apis.people_in_space).toBe(!apiDefaultStatus);
});

it("checks if a patch request to toggle api status returns status(200) and message 'Api status updated' when previous status is being toggled from false to true", async () => {
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
  const response = await request.patch("/api/toggle-api-status").set("Authorization", `Bearer ${token}`).send({
    status: true,
    api: "people_in_space",
  });

  const user = await User.findOne({ google_id: 1 });

  // then
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Api status updated");
  expect(newUser.apis.people_in_space).toBe(false);
  expect(user.apis.people_in_space).toBe(true);
});

it("checks if a patch request to toggle api status returns status(200) and message 'Api status updated' when previous status is being toggled from true to false", async () => {
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
  const response = await request.patch("/api/toggle-api-status").set("Authorization", `Bearer ${token}`).send({
    status: false,
    api: "people_in_space",
  });

  const user = await User.findOne({ google_id: 1 });

  // then
  expect(response.status).toBe(200);
  expect(response.body.message).toBe("Api status updated");
  expect(newUser.apis.people_in_space).toBe(true);
  expect(user.apis.people_in_space).toBe(false);
});
