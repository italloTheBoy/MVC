require('dotenv').config()
const express = require('express')
const hbs = require('express-handlebars')
const path = require('path')
const db = require('./database/db')
const Task = require('./models/Task') 

// Configure the app
const app = express()

app.engine('handlebars', hbs.engine())
app.set('view engine', 'handlebars')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Routes
const TaskRouter = require('./routes/TaskRouter')
app.use('/task', TaskRouter)

// Listen

db.sync({ force: false })
  .then(() => {
    const port = process.env.PORT ?? 3000

    app.listen(port, () => {
      console.log(`\nServer running in http://localhost:${port} \n`)
    })
  })
