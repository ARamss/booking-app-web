const mongoose = require('mongoose')
const {ObjectId} = mongoose.Schema.Types

const citaSchema = new mongoose.Schema({
    horario:{
      type:Date,
      required:true
    },
    usaInstalacion:{
        type:ObjectId,
        ref:"Instalacion"
    },
    agendadoPor:{
        type:ObjectId,
        ref:"User"
    }
})

mongoose.model("Cita", citaSchema)
