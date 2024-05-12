const mongoose = require('mongoose');

const awardSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true },
  name: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  }
});

const Award = mongoose.model('Award', awardSchema);

module.exports = Award;
