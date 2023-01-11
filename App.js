const express = require('express')
const app = express()
const Router = require('./Router/router')
const cors = require('cors')

app.use(cors())
app.use(express.json())

app.use('/salesforce', Router)

module.exports = app