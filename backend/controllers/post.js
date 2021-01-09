const Post = require('../models/post')
const User = require('../models/user')
require('sequelize')

const safeUserModel = {
  model: User,
  attributes: ['id', 'firstName', 'lastName'], // Pour ne garder que les informations utiles pour la page, sans les informations sensibles
}

exports.createPost = async (req, res, next) => {
  try {
    const post = new Post({
      title: req.body.title,
      body: req.body.body, // le texte contenu dans le post
      userId: req.userId, // l'ID de l'utilisateur ayant créé le post
      likes: 0,
      dislikes: 0,
    })
    await post.save()
    res.status(201).send(post.toJSON())
  } catch (error) {
    res.status(400).send({ error })
    console.error(error)
  }
}

exports.replyToPost = async (req, res, next) => {
  try {
    const postId = parseInt(req.params.id)
    const reply = await Post.create({
      body: req.body.body,
      userId: req.userId,
      postId: postId,
      likes: 0,
      dislikes: 0,
    })
    await reply.reload({
      include: safeUserModel,
    })
    res.status(201).send(reply.toJSON())
  } catch (error) {
    res.status(400).send({ error })
    console.error(error)
  }
}

exports.modifyPost = async (req, res, next) => {
  try {
    await Post.update(
      { title: req.body.title, body: req.body.body },
      {
        where: {
          id: req.params.id,
          userId: req.userId,
        },
      }
    )
    const updatedPost = await Post.findOne({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    })
    res.status(200).send(updatedPost.toJSON())
  } catch (error) {
    res.status(400).send({ error })
    console.error(error)
  }
}

exports.deletePost = async (req, res, next) => {
  try {
    const success = await Post.destroy({
      where: {
        id: req.params.id,
        userId: req.userId,
      },
    })
    if (!success) {
      throw 'Echec de suppression' // Renvoie 1 quand le post existe, renvoie 0 quand il n'existe pas. 0 = false
    }
    res.status(200).send()
  } catch (error) {
    res.status(400).send({ error })
    console.error(error)
  }
}

exports.getAllPosts = async (req, res, next) => {
  try {
    let posts = await Post.findAll({
      where: { postId: null },
      order: [['createdAt', 'DESC']], // Pour renvoyer les posts plus récents en premier
      include: [safeUserModel, 'Likes'],
    })
    for (let i in posts) {
      const p = posts[i]
      const likes = await p.countLikes()
      const post = p.toJSON()
      delete post.Likes
      post.likes = likes
      posts[i] = post
    }
    res.send(posts)
  } catch (error) {
    res.status(400).send({ error })
    console.error(error)
  }
}

exports.getPostAndReplies = async (req, res, next) => {
  try {
    let thread = await Post.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Post,
          include: safeUserModel,
          separate: true, // La requête de ce Post doit se faire séparément pour obtenir les informations du User
        },
        safeUserModel,
        'Likes',
      ],
    })
    const likes = await thread.countLikes()
    thread = thread.toJSON()
    delete thread.Likes
    thread.likes = likes
    res.status(200).send(thread)
  } catch (error) {
    console.log(error)
    res.status(400).send({ error })
  }
}

exports.likePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.id },
    })
    const likeWasAdded = await post.addLike(req.userId)
    if (!likeWasAdded) {
      post.removeLike(req.userId)
      res.status(200).send(false)
    } else {
      res.status(200).send(true)
    }
  } catch (error) {
    console.error(error)
    res.status(400).send({ error })
  }
}
