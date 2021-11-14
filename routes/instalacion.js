const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const requireLogin = require('../middleware/requireLogin')
const Cita = mongoose.model("Cita")
const User= mongoose.model("User")
const Instalacion = mongoose.model("Instalacion")

router.get('/todas-las-instalaciones',requireLogin,(req,res)=>{
    //show all posts
    Instalacion.find()
    .populate("_id name")
    .then(instalaciones=>{
        res.json({instalaciones})
    })
    .catch(error=>{
        console.log(error)
    })
})


router.post('/nueva-instalacion',requireLogin,(req,res)=>{
    const {name,pic} = req.body
    if(!name){
        res.status(422).json({error:"agrega un nombre"})
    }
    const instalacion = new Instalacion({
        name,
        photo:pic,
   })
   instalacion.save().then(result=>{
      res.json({instalacion:result})
   })
   .catch(error=>{
      console.log(error)
   })
})



//delete
router.delete('/borrar-instalacion/:citaId',requireLogin,(req,res)=>{
    Instalacion.findOne({_id:req.params.instalacionId})
    .populate("_id")
    .exec((error,post)=>{
         if(error || !instalacion){
              return res.status(422).json({error:error})
         }
         if(instalacion._id.toString() === req.instalacion._id.toString()){
              instalacion.remove()
              .then(result=>{
                  res.json(result)
              }).catch(error=>{
                  console.log(error)
              })
         }
    })
})






module.exports = router
