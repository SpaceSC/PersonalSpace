const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require('mongoose')
require('./util/inMemDb')

describe("Smoke tests", () => {
  it("Tests if Jest works", () => {
    expect(1).toBe(1);
  });

  it("Tests if supertest works", async () => {
    const response = await request.get("/api/something/does-not-exist")

    expect(response.status).toBe(404)
  })

  it("Tests if database works", async () => {
    // given
    const Planet = mongoose.model('Planet', { name: String })

    const newPlanet = new Planet({
      name: 'Pluto'
    })

    await newPlanet.save()

    // when
    const result = await Planet.countDocuments()

    // then
    expect(result).toBe(1)
  })
});
