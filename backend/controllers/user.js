const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const fs = require('fs') // file-system
const sharp = require('sharp') // convert images
const path = require('path')

const User = require('../models/user')

const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function signToken(userId) {
  return jwt.sign({ userId }, 'SUPERSECRET', {
    expiresIn: '24h',
  })
}

exports.signup = (req, res, next) => {
  try {
    if (!req.body.firstName) {
      throw 'Le prénom est requis'
    }
    if (!req.body.lastName) {
      throw 'Le nom est requis'
    }
    if (!req.body.email) {
      throw "L'email est requis"
    }
    if (!req.body.password) {
      throw 'Le mot de passe est requis'
    }
    if (req.file.size > 5000000) {
      res.status(400).json({ message: 'le fichier est trop volumineux' })
    } else {
      const { filename: image } = req.file
      sharp(req.file.path) // redimensionne les images trop larges
        .resize(500)
        .jpeg({ quality: 50 })
        .toFile(path.resolve(req.file.destination, 'resized', image))
    }

    bcrypt.hash(req.body.password, 10).then(async (hash) => {
      const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        imageUrl: `${req.protocol}://${req.get('host')}/images/resized/${
          req.file.filename
        }`,
        email: req.body.email,
        password: hash,
      })
      const { id, firstName, lastName, email } = user.toJSON()
      const token = signToken(id)
      res.json({ id, firstName, lastName, email, token })
    })
  } catch (error) {
    res.status(400).json({ error })
  }
}

exports.login = async (req, res, next) => {
  try {
    console.log(req.body)
    if (!req.body.email) {
      throw "L'email est requis"
    }
    if (!req.body.password) {
      throw 'Le mot de passe est requis'
    }
    const user = await User.findOne({
      where: { email: req.body.email },
    })
    if (!user) {
      return res.status(401).json({ error: 'Données invalides' })
    }
    const valid = await bcrypt.compare(req.body.password, user.password)
    if (!valid) {
      return res.status(401).json({ error: 'Mot de passe invalide' })
    }
    const { id, firstName, lastName, email } = user.toJSON()
    const token = signToken(id)
    res.json({ id, firstName, lastName, email, token })
  } catch (error) {
    res.status(400).json({ error })
  }
}
