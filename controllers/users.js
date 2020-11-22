/*************************
**** Users Controller ****
*************************/

/***************************
**** Users Initializers ****
****************************/

//Initialize express
const express = require('express');
const router = express.Router();

//Initialize bcrypt to encrypt passwords
const bcrypt = require('bcrypt');

//Import users model
const User = require('../models/users.js');

/********************
**** Users Paths ****
********************/

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
  //Check to see if a user with that email is already being used
  User.find({email: `${req.body.email}`}, (err, results) => {
    if (err)
      res.status(400).json({ error: "Error: Please Try Again" });
    else if (results.length)
      res.status(400).json({ error: "Email already in use"});
    else {
      //Check to see if a user with that name already exists
      User.find({username: `${req.body.username}`}, (err, results) => {
        if (err)
          res.status(400).json({ error: "Error: Please Try Again" });
        else if (results.length)
          res.status(400).json({ error: "Username already in use"});
        else {
          req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
          User.create(req.body, (error, createdUser) => {
          if (error) {
            res.status(400).json({ error: error.message })
          }
          console.log('Registered:', createdUser)
          res.status(200).json(createdUser)
          });
        }
      });
    }
  });
});

module.exports = router;
