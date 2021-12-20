require('dotenv').config()
const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const db = require('./database/db')


// Configure the app
const app = express()

app.engine('handlebars', hbs())
app.set('view engine', 'handlebars')

app.use(express.static(path.join(__dirname, 'public')))


// Routes


// Listen

db.sync()
  .then(() => {
    const port = process.env.PORT || 3000

    app.listen(port, () => {
      console.log(`\nServer running in http://localhost:${port} \n`)
    })
  })
