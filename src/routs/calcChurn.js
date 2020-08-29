const express = require('express'),
       {Developer,Branch} = require('../db/models'), 
       axios = require('axios')
churnRoute = new express.Router()

const getBranchDevs =async  ()=>{
    try {
        const developers = await Developer.find()
        const branches = await Branch.find()
        return {developers,branches}
    } catch (e) {
        console.log(e)
    }
}
const churnTable = async(since,untill,devs,branches)=>{
    let table = []
    const headers = {
         authorization:'token 53df3079a9011b416e0e194961e172d247cd62a6'
    }
    try{
        for (dev of devs){        
            for(branch of branches){   
            const params = `?sha=${branch.name}&author=${dev.name}&since=${since}T10:11:11Z&until=${untill}T10:11:11Z`
            const url = `https://api.github.com/repos/${branch.owner}/${branch.repo}/commits${params}`
            const {data:commits} = await axios.get(url,{headers})
            let churn = 0 
            for(commit of commits){
                const {data} = await axios.get(`https://api.github.com/repos/${branch.owner}/${branch.repo}/commits/${commit.sha}`,{headers})
                churn += data.stats.additions - data.stats.deletions
            }
            table.push({
                dev:dev.name,
                repo:branch.repo,
                branch: branch.name,
                churn
            })
        }
    }
    }catch(e){
    }
    return table
}
churnRoute.post('/churn',async (req, res)=>{
    const {developers,branches} = await getBranchDevs()
    const {since,untill} = req.body
    const table = await churnTable(since, untill,developers,branches)
    res.send(table)
})


module.exports = churnRoute