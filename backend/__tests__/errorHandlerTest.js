const app = require("../app"); // Link to your server file
const supertest = require("supertest");
const request = supertest(app);
const errorHandler = require('../middleware/errorHandler');
const fetch = require("node-fetch");
jest.mock("node-fetch");

it("Tests if Jest works", () => {
  expect(1).toBe(1);
});

// it("tests if errorHandler middleware works", async () => {
// //   given
// //   mockError.mockImplementation(() => {
// //     throw new Error("Internal server error");
// //   });
// //   res = {
// //     send: function(){ },
// //     json: function(err){
// //     },
// //     status: function(responseStatus) {
// //         assert.equal(responseStatus, 404);
// //         // This next line makes it chainable
// //         return this; 
// //     }
// // }
// const err = { status: 500, message: 'Internal server error' }

// // fetch.mockImplementation(() =>
// //   Promise.resolve({
// //     status: 500,
// //     json: () => Promise.resolve({
// //       message: 'Internal server error',
// //       }),
// //     })
// //   );
// const mockResponse = {
//   const res = {};
//   // replace the following () => res
//   // with your function stub/mock of choice
//   // making sure they still return `res`
//   res.status = () => res;
//   res.json = () => res;
//   return res;
// };

//   console.log = jest.fn(); // mock console log
//   // const mockRes = jest.fn().mockImplementation(() => 
//   // { 
//   //   status: jest.fn()
//   // }
//   // );
//   // when
//   errorHandler(err, null, mockResponse );

//   // then
//   expect(console.log).toHaveBeenCalledWith(err);
//   expect(console.log).toHaveBeenCalledWith('Internal server error');
//   expect(response.status).toBe(500);
//   expect(response.body.message).toBe("Internal server error");
// });