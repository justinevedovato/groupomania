const { Model, DataTypes } = require('sequelize')
const db = require('../config/db')

class User extends Model {}
User.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    imgUrl: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
  },
  { sequelize: db, modelName: 'user' }
)

module.exports = User
