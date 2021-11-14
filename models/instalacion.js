const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const instalacionSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true
    },
    body:{
      type:String,
      required:true
    },
    photo:{
      type:String,
      required:true
    },
    likes:[{type:ObjectId,ref:"User"}],
    comments:[{
        text:String,
        postedBy:{type:ObjectId,ref:"User"}
    }],
    schedule:{
        type:ObjectId,
        ref:"User"
    }
})

mongoose.model("Instalacion", instalacionSchema)
