const express = require('express'),
       {Developer,Url} = require('../db/models'), 
       axios = require('axios')
churnRoute = new express.Router()

const getUrlDevs =async  ()=>{
    try {
        const developers = await Developer.find()
        const urls = await Url.find()
        return {developers,urls}
    } catch (e) {
        console.log(e)
    }
}
const churnTable = async(after,before,devs,urls)=>{
    table = []
     devs.forEach(async dev=>{
        const author = dev.name
        urls.forEach(async url=>{
            const {data} = await axios.post(`${url}/churn`,{params: {
                    before,after,author
                }})
            table.push({name:dev.name,cont:data.result.contribution,churn:data.result.churn})
        })
    })
    return table
}
churnRoute.get('/churn',async (req, res)=>{
    const {developers,urls} = await getUrlDevs()
    const {after,before} = req.body
    const table = await churnTable(after, before,developers,urls)
    res.send(table)
})


module.exports = churnRoute