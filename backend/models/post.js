const { Model, DataTypes } = require('sequelize')
const db = require('../config/db')
const Thread = require('./thread')
const User = require('./user')

class Post extends Model {}
Post.init(
  {
    body: DataTypes.STRING,
  },
  { sequelize: db, modelName: 'post' }
)
Thread.hasMany(Post)
Post.belongsTo(Thread)
Post.belongsTo(User)

module.exports = Post
