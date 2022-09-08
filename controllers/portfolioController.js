const express =require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
module.exports={
    index: (req,res)=>{
        res.sendFile(path+'/portfolio/index.html')
    },
}