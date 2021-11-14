const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Cita = mongoose.model("Cita")
const User= mongoose.model("User")

router.get('/todas-las-citas',requireLogin,(req,res)=>{
    //show all posts
    Cita.find()
    .populate("agendadoPor","_id name")
    .populate("comments.postedBy","_id name")
    .then(citas=>{
        res.json({citas})
    })
    .catch(error=>{
        console.log(error)
    })
})


router.post('/nueva-cita',requireLogin,(req,res)=>{
    const {horario,instalacion} = req.body
    if(!instalacion || !horario){
        res.status(422).json({error:"Por favor llena todos los campos"})
    }
    req.user.password = undefined
    req.instalacion._id
    const cita = new Cita({
        horario,
        usaInstalacion:req.instalacion,
        agendadoPor:req.user
   })
   cita.save().then(result=>{
      res.json({cita:result})
   })
   .catch(error=>{
      console.log(error)
   })
})

//all posts from user
router.get('/mis-citas',requireLogin,(req,res)=>{
    Cita.find({agendadoPor:req.user._id})
    .populate("agendadoPor","_id name")
    .then(misCitas=>{
        res.json({misCitas})
    })
    .catch(error=>{
        console.log(error)
    })
})

//delete posts from user
router.delete('/borrar-cita/:citaId',requireLogin,(req,res)=>{
    Cita.findOne({_id:req.params.citaId})
    .populate("agendadoPor","_id")
    .exec((error,post)=>{
         if(error || !post){
              return res.status(422).json({error:error})
         }
         if(cita.agendadoPor._id.toString() === req.user._id.toString()){
              cita.remove()
              .then(result=>{
                  res.json(result)
              }).catch(error=>{
                  console.log(error)
              })
         }
    })
})






module.exports = router
