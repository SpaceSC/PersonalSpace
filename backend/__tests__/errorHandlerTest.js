//  this unit test doesn't have many dependencies
const errorHandler = require('../middleware/errorHandler');

it("tests if errorHandler middleware works", async () => {
  // given
  const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
  };

  console.error = jest.fn(); // mock console error

  const err = { message: 'Internal server error' }
  const res = mockResponse();

  // when
  errorHandler(err, null, res )

  // then
  expect(console.error).toHaveBeenCalledWith(err);
  expect(res.status).toHaveBeenCalledWith(500);
  expect(res.json).toHaveBeenCalledWith({message: 'Internal server error'});
});