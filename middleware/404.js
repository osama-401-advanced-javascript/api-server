'use strict';
function notFound(req, res, next) {
  res.status(404);
  res.statusMessage = 'Not Found :(';
  // console.log(res.statusMessage);
  // console.log(res.status(404));
  res.json({ error: `Message Not Found ${req.requestTime}` });
}
module.exports = notFound;