const { render } = require('express/lib/response')
const Task = require('../models/Task')

module.exports = class TaskController {
  // CREATE
  static createTask(req, res) {
    res.render('tasks/create')
  }

  static async createTaskSave(req, res) {
    const { title, description } = req.body

    const err = {}

    if (!title || title.trim() === '') err.title = 'Insira um título'  
    if (!description || description.trim() === '') err.description = 'Insira uma descrição'
    console.log(err)

    if (Object.keys(err).length > 0) {
      res.render('tasks/create', { 
        err,
        title: title.trim(),
        description: description.trim(),
      })
    }else {
      await Task.create({ 
        title: title.trim().toLowerCase(),
        description: description.trim(),
      })
        .then(() => res.redirect('/task'))
        .catch(err => {
          res.redirect('/500')
        })
    }
  }

  // READ
  static listTasks(req, res) {
    res.render('tasks/list')
  }
}