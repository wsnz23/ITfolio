// Import mongoose
const mongoose = require('mongoose');


// Define the schema for user data
const UserCheckboxSchema = new mongoose.Schema({
  username: { type: String, required: true },
  checkboxes: [
    {
        label: { type: String, required: true },
        isChecked: { type: Boolean, default: false }
    }
    ]

});

const Checkbox = mongoose.model('UserCheckbox', UserCheckboxSchema);

module.exports = Checkbox;
