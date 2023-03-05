const express = require('express')
const GETRouter = express.Router()
const { OrderSales, CreateJWT } = require('../Controller/GETSalesForceController')

GETRouter.route('/ador-ai/salesforce/prod/96').post(OrderSales)
GETRouter.route('/ador-ai/salesforce/prod/Oauth/generate').post(CreateJWT)

module.exports = GETRouter