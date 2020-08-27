const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name:{
        type: String
    }
})

const Developer = mongoose.model('Developer',schema)
const Url = mongoose.model('Url',schema)

module.exports = {
    Developer,Url
}