const { Model, DataTypes } = require('sequelize')
const db = require('../config/db')
const User = require('./user')

class Post extends Model {}
Post.init(
  {
    title: DataTypes.TEXT,
    body: DataTypes.TEXT,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER,
  },
  { sequelize: db, modelName: 'post' }
)

Post.belongsTo(User)
Post.hasMany(Post)
User.hasMany(Post)
Post.belongsToMany(User, { as: 'Likes', through: 'PostLikes' })
User.belongsToMany(Post, { through: 'PostLikes' })

module.exports = Post
