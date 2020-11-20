const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/users.js')

router.get('/users', (req, res) => {
  User.find({currentUser: req.session.currentUser }, (error, signIn) => {
    if (error)
    res.status(400).json({error: error.message});
  else
    res.status(200).json(signIn);
  });
});
