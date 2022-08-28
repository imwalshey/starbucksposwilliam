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
        res.sendFile(path+'/coreDrinks.html')
    },
    order: (req,res)=>{
            let checker = (arr, target) => target.every(v => arr.includes(v));
            let points = 0
            req.body.drinksArray.forEach((drink,i)=>{
                if(req.body.drinksArray[i]!==undefined){
                let answer
                let correctAnswer = JSON.parse(JSON.stringify(customerController.customerCorrectAnswers[Number(req.body.customerID)]))
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
                console.log( answer.decaf)
                console.log( correctAnswer.decaf)
                if(checker(answer.decaf,correctAnswer.decaf)){
                    delete answer.decaf
                    delete correctAnswer.decaf
                }
                if(JSON.stringify(answer) ===JSON.stringify(correctAnswer)){
                    points+=1
                }
                console.log('answer')
                console.log(answer)
                console.log('correctAnswer')
                console.log(correctAnswer)
            }
            })
            if(points>=1){
                    res.json('win')
            }else{
                    res.json('lose')
            }
            //console.log(points)
    }
}