const express = require('express');
const router = express.Router();
const mongoose  = require('mongoose');
const bcrypt = require('bcrypt-nodejs')

const json =require('jsonwebtoken')

const User = require('../model/user');

/*router.post('/signup', (req,res,next)=>{
    console.log(JSON.stringify(req.body));
const newUser = new User({
    email:   req.body.email,
    password:  req.body.password    

});

newUser.save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message: 'User created'
        });
    
    
});

    .catch(err=>{
        console.log(err);
        if(err.code=='11000'){
            res.json(Common.generateResponse(5,error))
        }
        else{
            res.json(Common.generateResponse(100,error))
        }
    });
})*/
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
    
          /*if (err) {
            return res.status(401).json({
              message: "Auth failed bcrypt" 
            });
          }*/
          
            const token = jwt.sign(
              {
                email: req.body.email,
                
              },
             /* process.env.JWT_KEY,
              {
                  expiresIn: "1h"
              }*/
            );
            return res.status(200).json({
              message: "Auth successful",
              token: token
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
  /*router.post("/login", (req, res, next) => {
    User.find({ email: req.body.email })
      
      .then(user => {
        
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
          /*if (err) {
            return res.status(401).json({
              message: "Auth failed bcrypt"
            });
          }
          if (result) {
            const token = jwt.sign(
              {
                email: user[0].email,
               // userId: user[0]._id
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
            message: 'Internal Server Error'
        });
    });
  });*/

   

module.exports = router;
