const bcrypt = require('bcrypt')
const express = require('express')
const sessions = express.Router()
const User = require('../models/user.js')

sessions.get('/', (req, res) => {
  User.find({currentUser: req.session.currentUser }, (error, signIn) => {
    if (error)
    res.status(400).json({error: error.message});
  else
    res.status(200).json(signIn);

    });
});


  sessions.post('/signin', (req, res) => {

    User.findOne({ username: req.body.username }, (err, foundUser) => {
      if (err) {
        console.log(err)
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


sessions.delete('/signin', (req, res) => {
  req.session.destroy(() => {
    if (error)
    res.status(400).json({error: error.message});
  else
    res.status(200).json();
  })
})





module.exports = sessions;
