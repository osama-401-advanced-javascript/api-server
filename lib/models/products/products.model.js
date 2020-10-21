'use strict';

const productsModel = require('../products/products.schema.js');
const Collection = require('../mongo.js');

class Products extends Collection {
  constructor() {
    super(productsModel);
  }
}

module.exports = new Products();
