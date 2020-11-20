const bcrypt = require('bcrypt');
const express = require('express');
const User = require('../models/users.js');
const router = express.Router();

//Gets User
router.get('/', (req, res) => {
  User.find({currentUser: req.session.currentUser }, (error, registerUser) => {
    if (error)
      res.status(400).json({error: error.message});
    else
      res.status(200).json(registerUser);
    });
});

//POST Method, creates a new user
router.post('/register', (req, res) => {
  //Check to see if a user with that name already exists
  User.find({username: `${req.body.username}`}, (err, results) => {
    if (err)
      res.status(400).json({ error: "something happened" });
    else if (results.length)
      res.status(400).json({ error: "Username already created"});
    else {
      //We can make this use less lines if we want
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
        res.status(200).json(createdUser)
      });
    }
  });
});



module.exports = router;
