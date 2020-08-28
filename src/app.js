const express = require('express'),
      app = express(),
      path = require('path'),
      urlRoute = require('./routs/urlApi'),
      devRoute = require('./routs/devApi'),
      churnRoute = require('./routs/calcChurn')


//parsing json
app.use(express.json())
// the port that the app will run on
port = process.env.PORT || 3000
//html 
app.use(express.static(path.join(__dirname,'../public')))
//runing mongoose
require('./db/mongoose')
//routs
app.use(urlRoute)
app.use(devRoute)
app.use(churnRoute)
//runing the app
app.listen(port,()=>{
    console.log('server is up on port:' + port)
})