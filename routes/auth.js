const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../keys')
const requireLogin = require('../middleware/requireLogin')

router.get('/protected',requireLogin,(req,res)=>{
    res.send("hi :)")
})

router.post('/signup', (req,res)=>{
    const {name,lastname,email,password} = req.body
    if(!name || !lastname ||  !email || !password){
          return res.status(422).json({error:"Por favor llena todos los campos"})
    }
    User.findOne({email:email})
      .then((savedUser)=>{
            if(savedUser){
              return res.status(422).json({error:"Este correo ya esta registrado"})
            }
            //Password Hash
            bcrypt.hash(password,12)
            .then(hashedpassword=>{
                const user = new User({
                    name,
                    lastname,
                    email,
                    password:hashedpassword
                })
                user.save()
                .then(user=>{
                    res.json({message:"Bienvenido!"})
                })
                .catch(error=>{
                    console.log(error)
                })
            })
          })
        .catch(error=>{
              console.log(error)
    })
})

router.post('/signin',(req,res)=>{
     const {email,password} = req.body
      if(!email || !password){
          return res.status(422).json({error:"Por favor llena todos los campos"})
      }
      User.findOne({email:email})
      .then(savedUser=>{
          if(!savedUser){
             return res.status(422).json({error:"Correo o Password Invalidos"})
          }
          bcrypt.compare(password,savedUser.password)
          .then(doMatch=>{
              if(doMatch){
                  //res.json({message:"Welcome back!"})
                  //Creating Token based on user id
                  const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                  const {_id,name,lastname,email} = savedUser
                  res.json({token,user:{_id,name,lastname,email}})
              }
              else{
                  return res.status(422).json({error:"Correo o Password Invalidos"})
              }
          }).catch(error=>{
                console.log(error)
          })
      })
})


module.exports = router
