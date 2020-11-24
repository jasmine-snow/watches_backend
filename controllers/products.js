/****************************
**** Products Controller ****
****************************/

/******************************
**** Products Initializers ****
******************************/

//Initialize Express
const express = require('express');
const router = express.Router();

//Import Products Schema
const Product = require("../models/products.js");

//Import seed data
const productSeed = require('../models/products-seed.js');
const mongoose = require('mongoose');

/*********************************
**** Products Paths & Methods ****
*********************************/

//SEED route
router.post('/seed', async (req, res) => {
  if (req.body.currentUser.username !== "admin")
    res.status(403).json({error: "unauthorized access"});
  else {
    mongoose.connection.db.dropCollection('products');
    Product.create(productSeed, (error, data) => {
      if (error)
        res.status(400).json({error: error.message});
      else
        res.status(200).json(data);
    });
  }
});

// Index: Getting all products
router.get('/', (req, res) => {
  Product.find({}, (error, foundProducts) => {
    if (error)
      res.status(400).json({error: error.message});
    else
      res.status(200).json(foundProducts);
  });
});

//Search filter path: returns results based on query parameter
router.get('/search/:query', (req, res) => {
  Product.find({ $or: [
    {name: new RegExp(req.params.query, 'gi')},
    {description: new RegExp(req.params.query, 'gi')},
    {material: new RegExp(req.params.query, 'gi')},
    {color: new RegExp(req.params.query, 'gi')},
    {strap: new RegExp(req.params.query, 'gi')}
    ]}, (error, foundProducts) => {
    if (error)
      res.status(400).json({error: error.message});
    else
      res.status(200).json(foundProducts);
  });
});

// Show: Shows One Product
router.get('/id/:id', (req, res) => {
	Product.findById(req.params.id, (error, foundOneProduct) => {
    if (error)
      res.status(400).json({error: error.message});
    else
      res.status(200).json(foundOneProduct);
  });
});

//Delete: Deletes Product
router.delete('/:id', (req, res) => {
  Product.findByIdAndRemove(req.params.id, (err, deletedProduct) => {
    if (err)
      res.status(400).json({ error: err.message });
    else {
      console.log('Product Deleted:', deletedProduct)
      res.status(200).json({status: 200, message: "Product ID " + deletedProduct._id + " deleted"});
    }
  });
});

//Post: Creates Product
router.post('/', async (req, res) => {
  Product.create(req.body, (error, createdProduct) => {
    if (error)
      res.status(400).json({ error: error.message });
    else {
      console.log('Product Created:', createdProduct)
      res.status(200).json(createdProduct)
    }
  });
});

//Put: Edit Product
router.put('/:id', (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedProduct) => {
    if (err)
      res.status(400).json({ error: err.message });
    else {
      console.log('Updated Product:', updatedProduct);
      res.status(200).json(updatedProduct)
    }
  });
});

module.exports = router;
