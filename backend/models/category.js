const { Model, DataTypes } = require('sequelize')
const db = require('../config/db')

class Category extends Model {}
Category.init(
  {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
  },
  { sequelize: db, modelName: 'category' }
)

module.exports = Category
