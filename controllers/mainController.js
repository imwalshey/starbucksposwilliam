const express =require('express')
const { addListener } = require('nodemon')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const customerController = require('../controllers/customerController')
let path = (__dirname.split('/controllers')[0]+'/public')
function translateSize(input){
    let string = input.toLowerCase()
    if(string === 'large'|| string === 'venti'){
        return 'Vt'
    }
    if(string === 'medium'|| string === 'grande'){
        return 'Gr'
    }
    if(string === 'tall'|| string === 'small'){
        return 'Tl'
    }
} 
module.exports={
    index: (req,res)=>{
        res.sendFile(path+'/index.html')
    },
    roasts: (req,res)=>{
        res.sendFile(path+'/roasts.html')
    },
    menu: (req,res)=>{
        res.sendFile(path+'/Menu/menu.html')
    },
    coredrinks: (req,res)=>{
        res.sendFile(path+'/CoreDrinks/coreDrinks.html')
    },
    partnerHours:(req,res)=>{
        res.sendFile(path+'/PartnerHours/index.html')
    },
    order: (req,res)=>{
            let checker = (arr, target) => target.every(v => arr.includes(v));
            let points = 0
            let adviceText=''
            req.body.drinksArray.forEach((drink,i)=>{
                if(req.body.drinksArray[i]!==undefined && req.body.drinksArray[i]!==null){
                    let answer
                    let correctAnswer = JSON.parse(JSON.stringify(customerController.customerCorrectAnswers[Number(req.body.customerID)]))
                    
                    if(req.body.drinkIsIced[i]===true){
                        answer = req.body.drinksArray[i].iced
                        delete req.body.drinksArray[i].iced.ogPumps
                        delete req.body.drinksArray[i].iced.ogShots
                        delete req.body.drinksArray[i].iced.ogCustom
                        delete req.body.drinksArray[i].iced.ogMilk
                        delete req.body.drinksArray[i].iced.ogSyrup
                    }
                    if(req.body.drinkIsIced[i]===false){
                        answer = req.body.drinksArray[i].hot
                        delete req.body.drinksArray[i].hot.ogShots
                        delete req.body.drinksArray[i].hot.ogPumps
                        delete req.body.drinksArray[i].hot.ogMilk
                        delete req.body.drinksArray[i].hot.ogSyrup
                        delete req.body.drinksArray[i].hot.ogCustom
                    }
                    let answerI = translateSize(answer.size)
                    let cAnswerI = translateSize(correctAnswer.size)

                    
                    if(checker(answer.decaf,correctAnswer.decaf)){
                        delete answer.decaf
                        delete correctAnswer.decaf
                    }else{
                        
                    }
                    if(answer.pumps[answerI] === correctAnswer.pumps[cAnswerI]){
                        
                        delete answer.pumps
                        delete correctAnswer.pumps
                    }
                    if(answer.size === correctAnswer.size){

                    }
                    console.log(answer.milk)
                    if(answer.milk === correctAnswer.milk){
                        delete answer.milk
                        delete correctAnswer.milk
                    }else{
                        if((answer.milk.some((val)=>{ if(val.includes('w/')){return true}})) &&  (!correctAnswer.milk.some((val)=>{ if(val.includes('w/')){return true}}))){
                            adviceText+= "Try using the milk modifier buttons on the left.It's important to charge for more than 4oz of cream to account usage"
                        }else{}
                        
                    }
                    
                    if(JSON.stringify(answer) ===JSON.stringify(correctAnswer)){
                        points+=1
                    }
                    
                }
            })
            let problem = ''
            if(points>=1){
                    res.json({result : 'win'})
            }else{
                    res.json({
                        result : 'lose',
                        advice: adviceText
                    } )
            }
            //console.log(points)
    }
}