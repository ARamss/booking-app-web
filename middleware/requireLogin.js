const jwt = require('jsonwebtoken')
const{JWT_SECRET} = require('../keys')
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = (req,res,next) => {
    const{authorization} = req.headers
    //authorization === Bearer "token"
    if(!authorization){
        res.status(401).json({error:"Necesitas estar registrado"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(error,payload)=>{
      if(error){
        return res.status(401).json({error:"Necesitas estar registrado"})
      }
      const {_id} = payload

      User.findById(_id).then(userdata=>{
          req.user = userdata
          next()
      })
    })
}
