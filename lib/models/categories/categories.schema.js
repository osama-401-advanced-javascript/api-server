const mongoose = require('mongoose');

const categories = mongoose.Schema({
  name: { type: String, require: true },
  display_name: { type: String, required: true },
  description: {type: String,required: true},

});

module.exports = mongoose.model('categories', categories);
