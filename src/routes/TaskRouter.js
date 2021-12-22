const TaskController = require('../controllers/TaskController')
const routes = require('express').Router()


// GET
routes.get('/add', TaskController.createTask)
routes.get('/', TaskController.listTasks)

// POST
routes.post('/add', TaskController.createTaskSave)


module.exports = routes
