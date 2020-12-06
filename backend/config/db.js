// Pour se connecter à la base de données

const Sequelize = require('sequelize')
const conn = new Sequelize({
  dialect: 'sqlite',
  storage: 'storage/database.sqlite',
})
console.log('connected to database!')

module.exports = conn
