/********************
**** Users Model ****
********************/

//Initialize mongoose and schema models
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: false },
    phone: {type: String, required: false},
    email: {type: String, required: true, unique: true},
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
