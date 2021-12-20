const Sequelize = require('sequelize')


const { DB_NAME, DB_USER, DB_PASS, DB_HOST, DB_DIALECT } = process.env

const db = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: DB_DIALECT,
})


module.exports = db 