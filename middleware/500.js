'use strict';
function errorHandler(err, req, res, next) {
  res.status(500);
  res.statusMessage = 'Error :(';
  res.json({ error: `${err.message} ${req.requestTime}` });
}
module.exports = errorHandler;