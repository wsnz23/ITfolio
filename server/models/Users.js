const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
FullName:{ type:String,},
Email:{  type:String,unique:true},
Username:{  type:String,unique:true},
Password:{  type:String,},
Major:{  type:String,},
languages: {
    type: [String],
    default: null
  },
  country: {
    type: String,
    default: null
  },
  city: {
    type: String,
    default: null
  },
  birthday: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    default: null
  },
  gender: {
    type: String,
    default: null
  },
  profilePicture: {
    type: String,
    default: null
  },
 status: {
    type: String,
    default: "Active",
  },
  case: {
     type: String,
     default: "student",
   }
}
)


const UserModel = mongoose.model("user",UserSchema)
module.exports=UserModel
