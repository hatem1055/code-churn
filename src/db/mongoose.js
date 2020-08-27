const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://hatem1055:hatemmostafa10@cluster0.4cdvc.mongodb.net/test' ,{
    useNewUrlParser:true,
    useCreateIndex:true
})

// const Url = mongoose.model('Url',{
//     name:{
//         type: String
//     }
// })

// const test = new Url({
//     name:'www.google.com'
// })
// test.save()