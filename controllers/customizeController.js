const express =require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const customizationsModel = require('../models/customizations')


module.exports={
    sendCustomizations: (req,res)=>{
        res.json(customizationsModel.customizations)
    }
}