const express = require('express')
const app = express()
const PORT = 8000
const CORS = require('cors')
app.use(express.static('public'))
app.use(express.static('IMG'))
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(CORS())
app.use(express.urlencoded({ extended: true }))
app.use('/IMG', express.static(__dirname + '/IMG'));
app.use(express.json())


const APIRoutes = require('./routes/API')
const mainRoutes = require('./routes/main')
app.use('/api',APIRoutes)
app.use('/',mainRoutes)

// app.post('/order',(req,res)=>{
//     let points = 0
    
//     req.body.drinksArray.forEach((drink,i)=>{
//         let answer
        
//         if(req.body.drinkIsIced[i]===true){
//             answer = req.body.drinksArray[i].iced
//             delete req.body.drinksArray[i].iced.ogPumps
//             delete req.body.drinksArray[i].iced.ogShots
//         }
//         if(req.body.drinkIsIced[i]===false){
//             answer = req.body.drinksArray[i].hot
//             delete req.body.drinksArray[i].hot.ogShots
//             delete req.body.drinksArray[i].hot.ogPumps
//         }
//         if(JSON.stringify(answer) ===JSON.stringify(customerCorrectAnswers[Number(req.body.customerID)])){
//             points+=1
            
//         }
//     })
//     if(points>=1){
//             res.json('win')
//     }else{
//             res.json('lose')
//     }
    
// })

// app.get('/api/customers',(req,res)=>{
//     //console.log(req.body.randomNum)
//     const randomNum = Math.floor(Math.random() * (customers.length))
//     res.json(customers[randomNum])
// })







// app.get('/roasts',(req,res)=>{
//     res.sendFile(__dirname+'/public/roasts.html')
// })
// app.get('/coredrinks',(req,res)=>{
//     res.sendFile(__dirname+'/public/coreDrinks.html')
// })
// app.get('/menu',(req,res)=>{
//     res.sendFile(__dirname+'/public/menu.html')
// })
// app.get('/coredrinks/',(req,res)=>{
//     res.sendFile(__dirname+'/public/coreDrinks.html')
// })
// // app.get('/api/coreDrinks'.toLowerCase(),(req,res)=>{
// //     res.json(coreDrinks)
// // })
// app.get('/api/customizations'.toLowerCase(),(req,res)=>{
//     res.json(modifiers)
// })
// app.get('/api/roasts'.toLowerCase(),(req,res)=>{
//     res.json(roasts)
// })
// app.get('/api/customer'.toLowerCase(),(req,res)=>{
//     res.json(customer.phrase)
// })

app.listen(process.env.PORT || PORT)