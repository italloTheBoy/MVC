const { render } = require('express/lib/response')
const Task = require('../models/Task')

module.exports = class TaskController {
  // CREATE
  static createTask(req, res) {
    res.status(200).render('tasks/create')
  }

  static async createTaskSave(req, res) {
    const { title, description } = req.body

    const err = {}

    if (!title || title.trim() === '') err.title = 'Insira um título'  
    if (!description || description.trim() === '') err.description = 'Insira uma descrição'

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
        .then(() => res.status(200).redirect('/task'))
        .catch(err => {
          res.status(500).redirect('/500')
        })
    }
  }

  // READ
  static async readAllTasks(req, res) {
    await Task.findAll({raw: true})
      .then(task => {
        res.status(200).render('tasks/readAll', { task })
      })
  }
}