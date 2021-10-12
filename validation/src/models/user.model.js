const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  gender: { type: String, required: true },
  ip_adress: String,
  age: { type: Number, required: true },
});

const User = mongoose.model("user" , UserSchema);

module.exports = User;