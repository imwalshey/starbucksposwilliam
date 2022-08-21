const express =require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const modifiers={
    shotsMenu:[],
    syrup:[],
    milk:[],
    custom:[]
}
class Syrup{
    constructor(ABB,TYPE){
        this.type=TYPE
        this.abbr=ABB
    }
}
modifiers.shotsMenu={'Iced':'iced','Blonde':'coffeeType','Decaf':'coffeeType','1/2 Decaf':'coffeeType','2/3 Decaf':'coffeeType',
                    '1/3 Decaf':'coffeeType','Single':'shotNumber','Double':'shotNumber','Triple':'shotNumber',
                    'Quad':'shotNumber','More shots':'shotNumber','Affogato Shot':'shotNumber','Frappucino Roast':'pumps','Kids':"size",'Updosed':'coffeeType',
                    'Long Shot':'coffeeType','Ristretto':'coffeeType','Short':'size','Tall':'size','Grande':'size','Venti':'size','Trenta':'size'}
modifiers.syrup={
    'No':new Syrup('No','button'),'Sub':new Syrup('sub','button'),'Pumps':new Syrup('Pumps','button'),'Extra':new Syrup('XTR','button'),'Light':new Syrup('Lt','button'),
    'Caramel Syrup':new Syrup('CR','syrup'),'Cinnamon Dolce Syrup':new Syrup('CD','syrup'),
    'Hazelnut Syrup':new Syrup('H','syrup'),'Toffee Nut Syrup':new Syrup('TN','syrup'),'Vanilla Syrup':new Syrup('V','syrup'),'Classic Syrup':new Syrup('C','syrup'),'Peppermint Syrup':new Syrup('P','syrup'),
    'Raspberry Syrup':new Syrup('R','syrup'),'Toasted Vanilla Syrup':new Syrup('TV','syrup'),'Brown Sugar Syrup':new Syrup('BS','syrup'),'Chai':new Syrup('CH','syrup'),'Honey Blend':new Syrup('HB','syrup'),
    'Liquid Cane Sugar':new Syrup('LC','syrup'), 'Sugar Free Vanilla Syrup':new Syrup('SFV','syrup'),'Mocha Sauce':new Syrup('M','syrup'),'White Mocha Sauce':new Syrup('WC','syrup'), 'Caramel Sauce':new Syrup('CS','syrup'),
    'Dark Caramel Sauce Sauce':new Syrup('DC','syrup')
}

module.exports={
    sendCustomizations: (req,res)=>{
        res.json(modifiers)
    }
}