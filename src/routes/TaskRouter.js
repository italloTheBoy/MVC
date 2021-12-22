const TaskController = require('../controllers/TaskController')
const routes = require('express').Router()


// CREATE
routes.get('/add', TaskController.createTask)
routes.post('/add', TaskController.createTaskSave)

// READ
routes.get('/', TaskController.readAllTasks)


module.exports = routes
