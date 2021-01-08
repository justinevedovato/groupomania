const { Model, DataTypes } = require('sequelize')
const db = require('../config/db')

class User extends Model {}
User.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true },
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN, // Non utilisé, mais colonne déjà créée en vue d'une amélioration
  },
  { sequelize: db, modelName: 'user' }
)

module.exports = User
