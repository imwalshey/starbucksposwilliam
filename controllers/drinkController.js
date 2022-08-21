const express =require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

class DrinkBuild{
    constructor(IcedBool,DecafAmount,Shots,Pumps,Syrup,Milk,Custom,ABBR,SIZE){
        this.iced=IcedBool
        this.decaf=DecafAmount
        this.shots=Shots
        this.pumps= [Pumps]
        this.syrup=[Syrup]
        this.milk=Milk
        this.custom=Custom
        this.abbr=ABBR
        
        if(SIZE){
            this.size=SIZE
        }else this.size = 'Gr'
    }
}

const drinkController = require('../models/drinks')
//console.log(drinkController.brewed)
module.exports={
    allDrinks: (req,res)=>{
        res.json(drinkController)
    },
    customerDrinks : drinkController,
    drinkBuild : DrinkBuild

}