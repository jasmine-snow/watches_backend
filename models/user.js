
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema(
  {
    name: { type: String, required: false },
    phone: {type: String, required: false},
    email: {type: String, required: false},
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('users', User)
