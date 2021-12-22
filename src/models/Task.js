const db = require('../database/db')
const { DataTypes } = require('sequelize')


const Task = db.define('task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    required: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false, 
    required: true,
  },
  done: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false, 
    required: true,
  },
})


module.exports = Task