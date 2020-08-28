const express = require('express'),
       {Developer} = require('../db/models'), 
DevRouter = new express.Router()

//new Developer
DevRouter.post('/dev',async (req,res)=>{
    name = req.body.name
    newDeveloper = new Developer({
        name:name
    })
    try{
        savedDeveloper = await newDeveloper.save()
        res.send({name:savedDeveloper.name,id:savedDeveloper._id})
    }catch (e){
        res.send(e)
    }
})

//update Developer
DevRouter.patch('/dev',async (req,res)=>{
    const _id = req.body.id;
    try {
        const name = req.body.name
        const developer = await Developer.findOneAndUpdate({_id},{name})
        saved = await developer.save()
        res.send({
            id:saved._id,
            name
        })
    } catch (e) {
        res.send(e)
    }
})

//delet Developer
DevRouter.delete('/dev',async (req, res)=>{
    const _id = req.body.id
    try {
        const developer = await Developer.findOneAndDelete({_id})
        res.send(developer)
    } catch (e) {
        res.send(e)
    }
})

//get Developers
DevRouter.get('/dev', async (req, res)=>{
    try {
        const developers = await Developer.find()
        res.send(developers)
    } catch (e) {
        res.send(e)
    }
})


module.exports = DevRouter

