'use strict';
const { server } = require('../lib/server.js');
const supertest = require('supertest');
const mockRequest = supertest(server);
const notFound = require('../middleware/404.js');
describe('not found middleware', () => {
  //   const req = {};
  //   const res = {};
  //   const next = jest.fn();
  it('should respond with 404 on a wrong route', () => {
    return mockRequest.get('/foo').then((results) => {
      console.log(results.res);
      expect(results.status).toBe(404);
    });
  });
  //   it('should respond with 404 on a wrong route', () => {
  //     return mockRequest.get('/foo').then((results) => {
  //         console.log(re);
  //       expect(results.statusMessage).toEqual('Not Found :(');
  //     });
  //   });
  //   it('define property statusMessage correctly', () => {
  //     notFound(req, res, next);
  //     expect(req.statusMessage).toEqual('Not Found :(');
  //   });
  //   it('define property statusMessage correctly', () => {
  //     notFound(req, res, next);
  //     expect(res.status).toEqual(404);
  //   });
});