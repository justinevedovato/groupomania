const { Model, DataTypes } = require('sequelize')
const db = require('../config/db')

class User extends Model {}
User.init(
  {
    username: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  { sequelize: db, modelName: 'user' }
)

module.exports = User
