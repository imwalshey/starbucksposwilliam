const express =require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const customerController = require('../controllers/customerController')
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
    },
    order: (req,res)=>{
            let points = 0
            req.body.drinksArray.forEach((drink,i)=>{
                let answer
                
                if(req.body.drinkIsIced[i]===true){
                    answer = req.body.drinksArray[i].iced
                    delete req.body.drinksArray[i].iced.ogPumps
                    delete req.body.drinksArray[i].iced.ogShots
                }
                if(req.body.drinkIsIced[i]===false){
                    answer = req.body.drinksArray[i].hot
                    delete req.body.drinksArray[i].hot.ogShots
                    delete req.body.drinksArray[i].hot.ogPumps
                }
                if(JSON.stringify(answer) ===JSON.stringify(customerController.customerCorrectAnswers[Number(req.body.customerID)])){
                    points+=1
                    
                }
                console.log(answer)
                console.log(customerController.customerCorrectAnswers[Number(req.body.customerID)])
            })
            if(points>=1){
                    res.json('win')
            }else{
                    res.json('lose')
            }
            
    }
}