const express = require('express'),
       {Url} = require('../db/models'), 
urlRouter = new express.Router()

//new url
urlRouter.post('/url',async (req,res)=>{
    name = req.body.name
    newUrl = new Url({
        name:name
    })
    try{
        savedUrl = await newUrl.save()
        res.send({name:savedUrl.name,id:savedUrl._id})
    }catch (e){
        res.send(e)
    }
})

//update url
urlRouter.patch('/url',async (req,res)=>{
    const _id = req.body.id;
    try {
        const name = req.body.name
        const url = await Url.findOneAndUpdate({_id},{name})
        saved = await url.save()
        res.send({
            id:saved._id,
            name
        })
    } catch (e) {
        res.send(e)
    }
})

//delet url
urlRouter.delete('/url',async (req, res)=>{
    const _id = req.body.id
    try {
        const url = await Url.findOneAndDelete({_id})
        res.send(url)
    } catch (e) {
        res.send(e)
    }
})

//get urls
urlRouter.get('/url', async (req, res)=>{
    try {
        const urls = await Url.find()
        res.send(urls)
    } catch (e) {
        res.send(e)
    }
})


module.exports = urlRouter

