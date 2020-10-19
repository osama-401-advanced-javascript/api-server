'use strict';
function logger(req, res, next) {
  console.log('__Request__', req.method, req.path, req.requestTime);
  // very important to call the next method in the end of the middleware to go to the next function
  next();
}
module.exports = logger;