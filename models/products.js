/***********************
**** Products Model ****
***********************/

//Initialize mongoose
const mongoose = require('mongoose');

//Create Product Schema
const productSchema = mongoose.Schema(
  {
    name: {type: String, required: true},
    price: {type: Number, min: 0, required: true},
    description: {type: String},
    img: {type: String, required: false},
    material: {type: String, required: false},
    color: {type: String, required: false},
    strap: {type: String, required: false},
    qty: {type: Number, min: 0, required: true}
  },  
  {     
    writeConcern: {
      w: 'majority',
      j: true,
      wtimeout: 1000
    },
    timestamps: true 
  }
);

//Export Products model
module.exports = mongoose.model('Product', productSchema);
