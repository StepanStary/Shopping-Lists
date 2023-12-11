// V souboru models/example.model.js
const mongoose = require('mongoose');

const exampleSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Example = mongoose.model('Example', exampleSchema);

module.exports = Example;
