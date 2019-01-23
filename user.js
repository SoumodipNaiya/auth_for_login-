const express = require('express');
const router = express.Router();
const mongoose  = require('mongoose');
const bcrypt = require('bcrypt-nodejs')

const User = require('../model/user');
router.post("/signup", (req, res, next) => {
    User.find({ email: req.body.email })

    console.log(JSON.stringify(req.body));
    
    const newUser = new User({
        email:req.body.email,
        password:req.body.password
    });
    newUser.save()
    .then(result=>{
        return res.status(409).json({
            message:"success"
        });
    })
    .catch(err=> {
        console.log(err)
        if (err.code == 11000) {
            return res.status(409).json({
                message:"Exists"
            });
        }
        return res.json({
            message: 'Internal Server Eror'
        });
    })
});
router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
      
      .then(newUser => {
        bcrypt.compare(req.body.password, newUser[0].password, (err, result) => {
          
          if (result) {
            const token = jwt.sign(
              {
                email: newUser[0].email,
                
              },
              process.env.JWT_KEY,
              {
                  expiresIn: "1h"
              }
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
            });
          }
          res.status(401).json({
            message: "Auth failed for 401"
          });
        });
      })
      .catch(err=> {
        console.log(err)
        if (err.code == 11000) {
            return res.status(409).json({
                message:"Auth failed for code 11000"
            });
        }
        return res.json({
            message: 'Internal Server Eror1'
        });
    })
  })
  module.exports = router;
