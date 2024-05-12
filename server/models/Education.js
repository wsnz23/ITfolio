// Assuming you're using MongoDB and Mongoose for your schema and API

const mongoose = require('mongoose');

// Define the schema for the Education model
const educationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true },
  university: { type: String, required: true },
  major: { type: String, required: true },
  graduationDate: { type: Number, required: true },
  gpa:{ type: String, required: true },
});

// Create the Education model
const Education = mongoose.model('Education', educationSchema);

module.exports = Education;
