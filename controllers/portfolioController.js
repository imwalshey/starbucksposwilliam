const express =require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
let path = (__dirname.split('/controllers')[0]+'/public')
app.use(express.static('public/Portfolio'))
module.exports={
    index: (req,res)=>{
        res.sendFile(path+'/Portfolio/index.html')

    },
}