'use strict';

const categoriesModel = require('./categories.schema');
const Collection = require('../mongo.js');

class Categories extends Collection {
  constructor() {
    super(categoriesModel);
  }
}

module.exports = new Categories();
