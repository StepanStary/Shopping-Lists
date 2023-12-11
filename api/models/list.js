const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    default: [],
  },
});

const List = mongoose.model('List', listSchema);

module.exports = List;
