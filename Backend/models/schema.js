const mongoose = require("mongoose");
const validator = require("validator");
const userSchema = new mongoose.Schema({
  fname: {
    type: String,
    requires: true,
    trime: true,
  },
  lname: {
    type: String,
    requires: true,
    trime: true,
  },
  email: {
    type: String,
    requires: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw Error("not valid email");
      }
    },
  },
  mobile: {
    type: String,
    requires: true,
    minlength: 11,
    maxlength: 11,
  },
  gender: {
    type: String,
    required: true,
  },
  profile: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  datecreated: {
    type: Date,
  },
  dateupdated: Date,
});


const UserCollection=new mongoose.model("UserCollection",userSchema);

module.exports=UserCollection;