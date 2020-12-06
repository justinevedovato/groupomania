const { Model, DataTypes } = require('sequelize')
const db = require('../config/db')
const Category = require('./category')

class Thread extends Model {}
Thread.init(
  {
    title: DataTypes.STRING,
  },
  { sequelize: db, modelName: 'thread' }
)
Category.hasMany(Thread)
Thread.belongsTo(Category)

module.exports = Thread
