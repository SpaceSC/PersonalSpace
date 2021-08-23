require("dotenv").config({ path: ".env.test" });
const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require("mongoose");
require("./util/inMemDb");
const jwt = require("jsonwebtoken");
const User = require('../models/userModel');
const Apod = require('../models/apodModel');
const fetch = require("node-fetch");
jest.mock("node-fetch");

it("checks if a get request to /api/apod/:date returns status(200) and a random APOD", async () => {
  // given
  
  const token = jwt.sign({ google_id: 1 }, process.env.JWT_SECRET);

  fetch.mockImplementation(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: () => Promise.resolve({
      date: '1995-06-20',
      explanation: "Today's Picture: June 20, 1995    The Pleiades Star Cluster  Picture Credit: Mount Wilson Observatory  Explanation:  The Pleiades star cluster, M45, is one of the brightest star clusters visible in the northern hemisphere. It consists of many bright, hot stars that were all formed at the same time within a large cloud of interstellar dust and gas. The blue haze that accompanies them is due to very fine dust which still remains and preferentially reflects the blue light from the stars.   We keep an archive of previous Astronomy Pictures of the Day.   Astronomy Picture of the Day is brought to you by  Robert Nemiroff and  Jerry Bonnell . Original material on this page is copyrighted to Robert J. Nemiroff and Jerry T. Bonnell.",
      hdurl: 'https://apod.nasa.gov/apod/image/pleiades2.gif',
      media_type: 'image',
      service_version: 'v1',
      title: 'Pleiades Star Cluster',
      url: 'https://apod.nasa.gov/apod/image/pleiades2.gif'
    }),
    })
  );

  // when
  const response = await request.get("/api/apod/1995-06-20").set("Authorization", `Bearer ${token}`)

  // then
  expect(response.status).toBe(200);
  expect(response.body.explanation.length).not.toBe(0);
});

it("checks if a get request to /api/apod/:date returns returns status(400) when the date is invalid", async () => {
  
  const token = jwt.sign({ google_id: 1 }, process.env.JWT_SECRET);

  fetch.mockImplementation(() =>
  Promise.resolve({
    status: 400,
    json: () => Promise.resolve({message: "Bad request"}),
    })
  );

  // when
  const response = await request.get("/api/apod/doge").set("Authorization", `Bearer ${token}`)

  // then
  expect(response.status).toBe(400);
  expect(response.body.message).toBe("Bad request");
});

it("checks if a get request to /api/apod/:date returns status(503) and the message 'Houston, we've had a problem' when today's APOD hasn't been uploaded in the US", async () => {
  // given
  
  const token = jwt.sign({ google_id: 1 }, process.env.JWT_SECRET);

  fetch.mockImplementation(() =>
  Promise.resolve({
    status: 503,
    json: () => Promise.resolve({message: "Houston, we've had a problem",}),
    })
  );

  // when
  const response = await request.get("/api/apod/1995-06-19").set("Authorization", `Bearer ${token}`)

  // then
  expect(response.status).toBe(503);
  expect(response.body.message).toBe("Houston, we've had a problem");
});