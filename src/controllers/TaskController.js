const { render } = require('express/lib/response')
const Task = require('../models/Task')

module.exports = class TaskController {
  // CREATE
  static createTask(req, res) {
    res.status(200).render('tasks/create')
  }

  static async createTaskPost(req, res) {
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
    await Task.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      },
      raw: true,
    })
      .then(task => {
        res.status(200).render('tasks/readAll', { task })
      })
  }

  static async readOneTask(req, res) {}

  // UPDATE
  static async updateTask(req, res) {
    const id = req.params.id

    await Task.findByPk(id, {
      raw: true,
      attributes: ['id', 'title', 'description']
    })
      .then(task => {
        task 
        ? res.status(200).render('tasks/update', { task }) 
        : res.status(404).redirect('/404')
      })
      .catch(err => {
        console.log(err)
        return res.redirect('/500')
      })  
  }

  static async updateTaskPost(req, res) {
    const { title, description } = req.body
    const id = Number(req.body.id)

    // Val
    const err = {}

    if (!id) err.id = 'Insira um ID'
    else {
      await Task.findByPk(id, { attributes: ['id'] })
        .then(task => {
          if (!task) err.id = 'ID não encontrado'
        })
        .catch(err => {
          console.log(err)
          return res.redirect('/500')
        })
    }

    if (!title || title.trim() === '') err.title = 'Insira um título' 

    if (!description || description.trim() === '') err.description = 'Insira uma descrição'

    // Redirect
    if (Object.keys(err).length > 0) {
      const task = { 
        id,
        title: title.trim(),
        description: description.trim(),
      }

      res.render('tasks/update', { task, err })
    }else {
      await Task.update({
        title: title.trim().toLowerCase(),
        description: description.trim(),
      },
      { where: { id } })
        .catch(err => {
          console.log(err)
          return res.redirect('/500')
        })

      return res.status(200).redirect('/task')
    }
  }
        

  // DELETE
  static async deleteTask(req, res) {
    const { id } = req.body

    try {
      await Task.findByPk(id, { attributes: ['id'] })
      ? (
        await Task.destroy({ where: { id } })
          .then(() => res.status(200).redirect('/task'))
        )
      : res.status(404).redirect('/404')
    }
    catch (err) {
      res.status(500).redirect('/500')
    }
  }
}