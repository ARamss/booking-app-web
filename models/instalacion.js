const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const instalacionSchema = new mongoose.Schema({
    name:{
      type:String,
      required:true
    },

})

mongoose.model("Instalacion", instalacionSchema)
