const TaskController = require('../controllers/TaskController')
const routes = require('express').Router()


// CREATE
routes.get('/add', TaskController.createTask)
routes.post('/add', TaskController.createTaskPost)

// READ
routes.get('/', TaskController.readAllTasks)
routes.get('/:id', TaskController.readOneTask)

// UPDATE
routes.get('/update/:id', TaskController.updateTask)
routes.post('/update', TaskController.updateTaskPost)

// DELETE
routes.post('/delete', TaskController.deleteTask)

module.exports = routes
