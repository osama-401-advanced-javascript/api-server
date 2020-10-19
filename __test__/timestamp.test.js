'use strict';
const timestamp = require('../middleware/timestamp.js');
describe('timestamp middleware', () => {
  const req = {};
  const res = {};
  const next = jest.fn();
  it('move to the next middleware', () => {
    timestamp(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
  it('define property requestTime correctly', () => {
    timestamp(req, res, next);
    expect(req.requestTime).toBeDefined();
  });
});