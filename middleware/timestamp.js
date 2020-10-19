'use strict';
function requestTime(req, res, next) {
  req.requestTime = new Date().toDateString();
  console.log(req.requestTime);
  next();
}
module.exports = requestTime;