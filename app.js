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
app.use(require('./routes/citas'))
app.use(require('./routes/instalacion'))

//start servers
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

//Production
if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
          res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    })
}

//start server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
