const bcrypt = require('bcrypt');
const express = require('express');
const sessions = express.Router();
const User = require('../models/users.js');

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
      res.status(400).json({error: error.message});
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser
        res.status(200).json(foundUser)
      } else {
        res.status(401).json({error: error.message});
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
