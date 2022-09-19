

const express = require('express')
const app = express()
const PORT = 8000
const CORS = require('cors')
app.use(express.static('public'))
app.use('/PartnerHours',express.static(__dirname + '/public/PartnerHours'))
app.use('/Menu',express.static(__dirname + '/public/Menu'))
app.use('/coreDrinks',express.static(__dirname + '/public/CoreDrinks'))
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

app.listen(process.env.PORT || PORT)



