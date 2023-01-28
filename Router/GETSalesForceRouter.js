const app = require('express')
const GETRouter = app.Router()
const { Sales } = require('../Controller/GETSalesForceController')

GETRouter.route('/', Sales)

module.exports = GETRouter