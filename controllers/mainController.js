const express =require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let path = (__dirname.split('/controllers')[0]+'/public')
module.exports={
    index: (req,res)=>{
        res.sendFile(path+'/index.html')
    },
    roasts: (req,res)=>{
        res.sendFile(path+'/roasts.html')
    },
    menu: (req,res)=>{
        res.sendFile(path+'/menu.html')
    },
    coredrinks: (req,res)=>{
        res.sendFile(path+'/coredrinks.html')
    }
}