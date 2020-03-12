
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const user = require('./router') // Imports routes for the products
require('dotenv').config();

app.use('/', user)
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

app.listen(`${process.env.PORT}`, () => {
  console.log(`Start server at port ${process.env.PORT}.`)
})