const mongoose = require('mongoose')


const clientSchema = mongoose.Schema({
  name: {type: String, required: true},
  price: {type: Number, required: false},
  img: {url: String, required: false},
  material: {type: String, required: false},
  color: {type: String, required: false},
  strap: {type: String, required: false},
  interchangeable: {type: Boolean, default: false}
})

module.exports = mongoose.model('Client', clientSchema)
