const express = require('express')
const app = express()
const PORT = 8000
const CORS = require('cors')

app.use(CORS())
/*
const coreDrinks = {
    'brewed': {
        "coffee":{
            'Simplicity':10,
            'Bitterness': 10,
            'Charge For Alt Milk': false,
            'Description':''
        },
        "dark roast":{
            'Simplicity':10,
            'Bitterness': 10,
            'Charge For Alt Milk': false,
            'Description':''
        },
        "blonde roast":{
            'Simplicity':10,
            'Bitterness': 10,
            'Charge For Alt Milk': false,
            'Description':''
        },
        "cafe misto":{
            'Simplicity':10,
            'Bitterness': 10,
            'Charge For Alt Milk': false,
            'Description':''
        },
        "iced coffee":{
            'Simplicity':10,
            'Bitterness': 10,
            'Charge For Alt Milk': false,
            'Description':''
        },
        "cold brew":{
            'Simplicity':10,
            'Bitterness': 10,
            'Charge For Alt Milk': false,
            'Description':''
        },
        "vanilla sweet cream cold brew":{
            'Simplicity':10,
            'Bitterness': 10,
            'Charge For Alt Milk': false,
            'Description':''
        },
        "salted caramel cream cold brew":{
            'Simplicity':10,
            'Bitterness': 10,
            'Charge For Alt Milk': false,
            'Description':''
        },
        "chocolate cream cold brew":{
            'Simplicity':10,
            'Bitterness': 10,
            'Charge For Alt Milk': false,
            'Description':''
        },
        'draft':{
            "nitro cold brew":{
                'Simplicity':10,
                'Bitterness': 10,
                'Charge For Alt Milk': false,
                'Description':''
            },
            "vanilla sweet cream nitro cold brew":{
                'Simplicity':10,
                'Bitterness': 10,
                'Charge For Alt Milk': false,
                'Description':''
            },
            "nitro cold brew":{
                'Simplicity':10,
                'Bitterness': 10,
                'Charge For Alt Milk': false,
                'Description':''
            },
        }
    },
    'espresso':{
        "latte":{
            'Simplicity':8,
            'Bitterness': 8,
            'Charge For Alt Milk': true,
            'Description':''
        },
        "cinnamon dolce latte":{
            'Simplicity':8,
            'Bitterness': 8,
            'Charge For Alt Milk': true,
            'Description':''
        },
        "cappuccino":{
            'Simplicity':8,
            'Bitterness': 8,
            'Charge For Alt Milk': true,
            'Description':''
        },
        "americano":{
            'Simplicity':9,
            'Bitterness': 10,
            'Charge For Alt Milk': false,
            'Description':''
        },
        "espresso":{
            'Simplicity':10,
            'Bitterness': 10,
            'Charge For Alt Milk': false,
            'Description':''
        },
        "espresso con pana":{
            'Simplicity':10,
            'Bitterness': 8,
            'Charge For Alt Milk': false,
            'Description':''
        },
        "espresso macchiato":{
            'Simplicity':7,
            'Bitterness': 9,
            'Charge For Alt Milk': true,
            'Description':''
        },
        "iced shaken espresso":{
            'Simplicity':7,
            'Bitterness': 9,
            'Charge For Alt Milk': true,
            'Description':''
        }


    }


}
*/

const coreDrinks = {'words':'words'}

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})
app.get('/coreDrinks'.toLowerCase(),(req,res)=>{
    res.json(coreDrinks)
})

app.get('/coredrinks/:cat',(req,res)=>{
    const category = req.params.cat.toLowerCase()
    if(coreDrinks[category]){
        res.json(coreDrinks[category])


        
    }else res.json(coreDrinks['brewed'])
})

app.get('/coredrinks/:cat/:drink',(req,res)=>{
            const category = req.params.cat.toLowerCase()
            const drink = req.params.drink.toLowerCase()
            if(coreDrinks[category][drink]){
                res.json(coreDrinks[category][drink])
            }else res.json(coreDrinks[category])
        })



app.listen(process.env.PORT || PORT)