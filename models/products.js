/***********************
**** Products Model ****
***********************/

//Initialize mongoose
const mongoose = require('mongoose');

//Initialize mongoose-fuzzy-search
const mongooseFuzzySearching = require('mongoose-fuzzy-searching');

//Create Product Schema
const productSchema = mongoose.Schema({
  name: {type: String, required: true},
  price: {type: Number, required: false},
  description: {type: String},
  img: {type: String, required: false},
  material: {type: String, required: false},
  color: {type: String, required: false},
  strap: {type: String, required: false},
  interchangeable: {type: Boolean, default: false}
}, {timestamps: true});

//Attach fuzzy searching to schema and specify which fields to fuzzy search for
productSchema.plugin(mongooseFuzzySearching, {
  fields: ['name', 'material', 'color', 'strap']
});

//Export Products model
module.exports = mongoose.model('Product', productSchema);
