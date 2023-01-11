const express = require('express')
const { postMethod } = require('../Controller/SalesForceController')
const Router = express.Router()

Router.route('/generate/token/send').post(postMethod)


module.exports = Router