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
