const express =require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const router = express.Router()
const customerModel = require('../models/customers')
module.exports={
    sendCustomer :(req,res)=>{
        let randomNum = Math.floor(Math.random() * (customerModel.customer.length))
        //randomNum = 4438
        res.json(customerModel.customer[randomNum])
    },
    sendAllCustomers :(req,res)=>{
        res.json(customerModel.customer)
    },
    customerCorrectAnswers : customerModel.correct,
    sendNames: (req,res)=>res.json({one: customerModel.customer, two:customerModel.correct})
    
}