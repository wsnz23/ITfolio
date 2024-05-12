const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
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

const Skill = mongoose.model('Skill', skillSchema);

module.exports = Skill;
