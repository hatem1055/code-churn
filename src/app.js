const express = require('express'),
      app = express(),
      path = require('path'),
      urlRoute = require('./routs/urlApi'),
      devRoute = require('./routs/devApi')


//parsing json
app.use(express.json())
// the port that the app will run on
port = process.env.PORT 
//html 
app.use(express.static(path.join(__dirname,'../public')))
//runing mongoose
require('./db/mongoose')
//routs
app.use(urlRoute)
app.use(devRoute)
//runing the app
app.listen(port,()=>{
    console.log('server is up on port:' + port)
})