const express = require('express'),
       {Branch} = require('../db/models'), 
branchRouter = new express.Router()

//new url
branchRouter.post('/branch',async (req,res)=>{
    name = req.body.name
    repo = req.body.repo
    owner = req.body.owner
    newBranch = new Branch({
        name,owner,repo
    })
    try{
        savedBranch = await newBranch.save()
        res.send(savedBranch)
    }catch (e){
        res.send(e)
    }
})

//update url
branchRouter.patch('/branch',async (req,res)=>{
    const _id = req.body.id;
    const name = req.body.name || false
    const repo = req.body.repo || false
    const owner = req.body.owner || false
    try {
        const oldBranch = await Branch.findById(_id)
        const branch = await Branch.findOneAndUpdate({_id},{
            name:name ? name:oldBranch.name,
            repo:repo ? repo:oldBranch.repo,
            owner:owner ? owner:oldBranch.owner 
        }),
        saved = await branch.save()
        res.send(saved)
    } catch (e) {
        res.send(e)
    }
})

//delet url
branchRouter.delete('/branch',async (req, res)=>{
    const _id = req.body.id
    try {
        const branch = await Branch.findOneAndDelete({_id})
        res.send(branch)
    } catch (e) {
        res.send(e)
    }
})

//get urls
branchRouter.get('/branch', async (req, res)=>{
    try {
        const branches = await Branch.find()
        res.send(branches)
    } catch (e) {
        res.send(e)
    }
})


module.exports = branchRouter

