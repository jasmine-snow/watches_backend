
const mongoose = require('mongoose')


const productSchema = mongoose.Schema({
  name: {type: String, required: true},
  price: {type: Number, required: false},
  description: {type: String},
  img: {url: String, required: false},
  material: {type: String, required: false},
  color: {type: String, required: false},
  strap: {type: String, required: false},
  interchangeable: {type: Boolean, default: false}
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema)
