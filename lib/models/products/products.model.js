'use strict';

const productsModel = require('../products/products.schema.js');
const Collection = require('../collection.js');

class Products extends Collection {
  constructor() {
    super(productsModel);
  }
}

module.exports = new Products();
