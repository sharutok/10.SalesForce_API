const express = require('express')
const app = express()
const POSTRouter = require('./Router/POSTSalesForceRouter')
const GETRouter = require('./Router/GETSalesForceRouter')
const cors = require('cors')
const morgan = require('morgan')
const SchedulerLogicController = require('./Scheduler/SchedulerLogicController')


app.use(cors())
app.use(express.json())
app.use(morgan('combined'))
app.use('/salesforce', POSTRouter)
app.use('/send', GETRouter)
SchedulerLogicController

module.exports = app