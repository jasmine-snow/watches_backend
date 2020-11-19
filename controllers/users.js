const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()
const Product = require("../models/products.js");
const productSeed = require('../models/products-seed.js')
const User = require('../models/user.js')

router.get('/', async (req, res) => {
  User.find({currentUser: req.session.currentUser }, (error, userSignIn) => {
    if (error)
    res.status(400).json({error: error.message});
  else
    res.status(200).json(userSignIn);
  });
});

router.post('/', async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  User.create(req.body, (error, createdUser) => {
    if (error) {
      res.status(400).json({ error: error.message })
    }
    console.log('Registered:', createdUser)
    res.status(200).send(createdUser)
  })
})


module.exports = router;
