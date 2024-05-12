const mongoose = require('mongoose');

// Define the schema for the Work History model
const workHistorySchema = new mongoose.Schema({
    username: {
        type: String,
        required: true },
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  }
});

// Create the Work History model
const WorkHistory = mongoose.model('WorkHistory', workHistorySchema);

module.exports = WorkHistory;
