const { Model, DataTypes } = require('sequelize')
const db = require('../config/db')
const User = require('./user')

class Post extends Model {}
Post.init(
  {
    title: DataTypes.TEXT,
    body: DataTypes.TEXT,
  },
  { sequelize: db, modelName: 'post' }
)

Post.belongsTo(User, { onDelete: 'CASCADE' })
User.hasMany(Post)
Post.hasMany(Post, { onDelete: 'CASCADE' })
Post.belongsToMany(User, { as: 'Likes', through: 'PostLikes' }) // Pour associer les tables 'User' et 'Post' quand un utilisateur Like un post
User.belongsToMany(Post, { through: 'PostLikes' })

module.exports = Post
