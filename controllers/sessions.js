/****************************
**** Sessions Controller ****
****************************/

/******************************
**** Sessions Initializers ****
******************************/

//Initialize express
const express = require('express');
const sessions = express.Router();

//Initialize bcrypt to encrypt passwords
const bcrypt = require('bcrypt');

//Import users model
const User = require('../models/users.js');

/***********************
**** Sessions Paths ****
***********************/

//not sure if we need this path???- hab
sessions.get('/login', (req, res) => {
  User.find({currentUser: req.session.currentUser }, (error, signIn) => {
    if (error)
    res.status(400).json({error: error.message});
  else
    res.status(200).json(signIn);
    });
});


//POST method for user sign
sessions.post('/', (req, res) => {
  User.findOne({ username: req.body.username }, (error, foundUser) => {
    if (error) {
      console.log(error);
      res.status(400).json({error: error.message});
    } else if (!foundUser){
      res.status(400).json({error: 'Username/Password not a match'});
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        console.log(req.session)
        res.status(200).json(foundUser);
      } else {
        res.status(401).json({error: 'Username/Password not a match'});
      }
    }
  })
});

//DELETE method for session (logout)
sessions.delete('/', (req, res) => {
  req.session.destroy((error) => {
    if (error)
      res.status(400).json({error: error.message});
    else
      res.status(200).json();
  })
});

module.exports = sessions;
