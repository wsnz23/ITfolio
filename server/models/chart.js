const mongoose = require('mongoose');

const majorSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  major: {
    type: String,
    required: true
  },
  submenu: [
    {
      skills: {
        type: String,
        required: true
      },
      sumRate: {
        type: Number,
        default: 0
      },
      count: {
        type: Number,
        required: true
      },
      courses: [
        {
          name: {
            type: String,
            required: true
          },
          rate: {
            type: Number,
            default: null
          }
        }
      ]
    }
  ]
});

const MajorModel = mongoose.model('MajorModel', majorSchema);

module.exports = MajorModel;
