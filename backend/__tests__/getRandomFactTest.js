require("dotenv").config({ path: ".env.test" });
const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
require("./util/inMemDb");
const jwt = require("jsonwebtoken");
const User = require('../models/userModel');
const RandomFact = require('../models/randomFactModel');

it("checks if a get request to /api/random-fact returns status(200) and a random fact", async () => {
  // given
  const newFact = new RandomFact({
    fact: "Random fact.",
    source: "Source",
  });
  await newFact.save();
  
  const token = jwt.sign({ google_id: 1 }, process.env.JWT_SECRET);

  // when
  const response = await request.get("/api/random-fact").set({authorization: token});

  // then
  expect(response.status).toBe(200);
  expect(JSON.stringify(response.body)).toBe(JSON.stringify(newFact));
  expect(response.body.fact).toBe("Random fact.");
  expect(response.body.source).toBe("Source");
});

it("checks if a get request to /api/random-fact returns status(404) and the message 'Fact not found' when there are no random facts in the database", async () => {
  // given
  const token = jwt.sign({ google_id: 1 }, process.env.JWT_SECRET);

  // when
  const response = await request.get("/api/random-fact").set({authorization: token});

  // then
  expect(response.status).toBe(404);
  expect(response.body.message).toBe("Fact not found");
});