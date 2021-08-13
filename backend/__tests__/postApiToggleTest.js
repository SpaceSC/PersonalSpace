const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const mongoose = require('mongoose')
require('./util/inMemDb')


it("checks if a post request without an authorization token in headers returns status(401)", async () => {
  // given
  // app has started
  
  // when
  const response = await request.post("/api/toggle-api-status").send({ 
    status: true, 
    api: "people_in_space" 
  });

  // then
  expect(response.status).toBe(401);
  
});


