const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000;
const mongoose = require('mongoose');
const {MDB} = require('./keys')


//connect to mongo database
mongoose.connect(MDB, {
  useNewUrlParser:true,
  useUnifiedTopology: true
})

//connection status
mongoose.connection.on('connected', ()=>{
    console.log("connected to mongodb")
})
mongoose.connection.on('error', ()=>{
    console.log("connection failed")
})

require('./models/user')
require('./models/cita')
require('./models/instalacion')

app.use(express.json());
app.use(require('./routes/auth'))
// app.use(require('./routes/post'))
// app.use(require('./routes/user'))

//start servers
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
