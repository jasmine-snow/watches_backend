/******************************
**** Products Initializers ****
******************************/

//Initialize Express
const express = require('express');
const router = express.Router();

//Import Products Schema
const Product = require("../models/products.js");

//Import seed data
const productSeed = require('../models/products-seed.js')

/*********************************
**** Products Paths & Methods ****
*********************************/

//SEED route
router.get('/seed', async (req, res) => {
  Product.create(productSeed, (error, data) => {
    if (error)
      res.status(400).json({error: error.message});
    else
      res.status(200).json(data);
  });
});

// Index: Getting all product
router.get('/', (req, res) => {
  Product.find({}, (error, foundProduct) => {
    if (error)
      res.status(400).json({error: error.message});
    else
      res.status(200).json(foundProduct);
  });
});

module.exports = router;
