const TaskController = require('../controllers/TaskController')
const routes = require('express').Router()


// CREATE
routes.get('/add', TaskController.createTask)
routes.post('/add', TaskController.createTaskPost)

// READ
routes.get('/', TaskController.readAllTasks)

// UPDATE
routes.get('/update/:id', TaskController.updateTask)
routes.post('/update', TaskController.updateTaskPost)

routes.post('/toggle', TaskController.toggleTaskStatus)

// DELETE
routes.post('/delete', TaskController.deleteTask)

module.exports = routes
