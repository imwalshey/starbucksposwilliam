const express = require('express')
const app = express()
const PORT = 8000
const coreDrinks = {
    'brewed': {
        "coffee":{
            'Simplicity':10,
            'Bitterness': 10,
            'Charge For Alt Milk': false,
            'Description':''
        },
        "Dark Roast":{
            'Simplicity':10,
            'Bitterness': 10,
            'Charge For Alt Milk': false,
            'Description':''
        },
        "Blonde Roast":{
            'Simplicity':10,
            'Bitterness': 10,
            'Charge For Alt Milk': false,
            'Description':''
        },
        "Cafe Misto":{
            'Simplicity':10,
            'Bitterness': 10,
            'Charge For Alt Milk': false,
            'Description':''
        }
    },
    'espresso':{
        "Latte":{
            'Simplicity':8,
            'Bitterness': 8,
            'Charge For Alt Milk': true,
            'Description':''
        },
        "Cinnamon Dolce Latte":{
            'Simplicity':8,
            'Bitterness': 8,
            'Charge For Alt Milk': true,
            'Description':''
        },
        "Cappuccino":{
            'Simplicity':8,
            'Bitterness': 8,
            'Charge For Alt Milk': true,
            'Description':''
        },
        "Americano":{
            'Simplicity':9,
            'Bitterness': 10,
            'Charge For Alt Milk': false,
            'Description':''
        },
        "Espresso":{
            'Simplicity':10,
            'Bitterness': 10,
            'Charge For Alt Milk': false,
            'Description':''
        },
        "Espresso Con Pana":{
            'Simplicity':10,
            'Bitterness': 8,
            'Charge For Alt Milk': false,
            'Description':''
        },
        "Espresso Macchiato":{
            'Simplicity':7,
            'Bitterness': 9,
            'Charge For Alt Milk': true,
            'Description':''
        },
        "Iced Shaken Espresso":{
            'Simplicity':7,
            'Bitterness': 9,
            'Charge For Alt Milk': true,
            'Description':''
        }


    }


}


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