const bcrypt = require('bcrypt')
const express = require('express')
const User = require('../models/user.js')
const router = express.Router()

//Gets User
router.get('/', (req, res) => {
  User.find({currentUser: req.session.currentUser }, (error, registerUser) => {
    if (error)
    res.status(400).json({error: error.message});
  else
    res.status(200).json(registerUser);
  });
});

//Registers User
router.post('/signup', (req, res) => {
  const userPassword = req.body.password
  const securePassword = bcrypt.hashSync(userPassword, bcrypt.genSaltSync(10))
  const userProfile = ({
    username: req.body.username,
    password: securePassword,
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  })
  User.create(userProfile, (error, createdUser) => {
    if (error) {
      res.status(400).json({ error: error.message })
    }
    console.log('Registered:', createdUser)
    res.status(200).send(createdUser)
  })
})



module.exports = router;
