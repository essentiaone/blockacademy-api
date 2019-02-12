const ROOT_PATH = process.cwd()
const cors = require('cors')
const exceptions = require(ROOT_PATH + '/app/middleware/exceptions')
const express = require('express')
const routs = require(ROOT_PATH + '/app/routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(routs)
exceptions.catch(app)

module.exports = app
