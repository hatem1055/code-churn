const mongoose = require('mongoose')

const devSchema = mongoose.Schema({
    name:{
        type: String
    }
})

const branchSchema = mongoose.Schema({
    name:{
        type: String
    },
    repo:{
        type: String
    },
    owner:{
        type: String
    }
})
const Developer = mongoose.model('Developer',devSchema)
const Branch = mongoose.model('Branch',branchSchema)

module.exports = {
    Developer,Branch
}