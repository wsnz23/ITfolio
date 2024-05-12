const mongoose = require('mongoose');

const interestSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true },
  interest: {
    type: String,
    required: true
  }
});

const Interest = mongoose.model('Interest', interestSchema);

module.exports = Interest;
