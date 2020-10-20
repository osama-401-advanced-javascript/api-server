'use strict';
const express = require('express');
const app = express();
const timestamp = require('../middleware/timestamp.js');
const logger = require('../middleware/logger.js');
const notFound = require('../middleware/404.js');
const errorHandler = require('../middleware/500.js');
const categoriesRouter=require('../routes/categories.js');
const productsRouter=require('../routes/products.js');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(timestamp);
app.use(logger);
app.use('/api/v1',categoriesRouter)
app.use('/api/v2',productsRouter)




app.get('/bad', (req, res) => {
  throw new Error('a test error');
});
app.use('*', notFound);
app.use(errorHandler);
module.exports = {
  server: app,
  start: () => {
    app.listen(PORT, () => {
      console.log(`Listening to PORT ${PORT}`);
    });
  },
};