const express = require('express')
const router = express.Router()
const drinkController = require('../controllers/drinkController')
const customerController = require('../controllers/customerController')
const customizeController = require('../controllers/customizeController')
const roastsController = require('../controllers/roastsController')


router.get('/coreDrinks', drinkController.allDrinks) 
router.get('/customers', customerController.sendCustomer) 
router.get('/allcustomers', customerController.sendAllCustomers) 
router.get('/allnames', customerController.sendNames) 
router.get('/customizations', customizeController.sendCustomizations) 
router.get('/roasts', roastsController.sendRoasts) 
module.exports = router