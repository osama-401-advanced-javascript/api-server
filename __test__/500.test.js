'use strict';
const { server } = require('../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);
const error = require('../middleware/500.js');
describe('Errorhandler is working', () => {
  it('should respond with 500 on an error', async () => {
    await mockRequest.get('/bad').then((results) => {
      expect(results.status).toBe(500);
    });
  });
});