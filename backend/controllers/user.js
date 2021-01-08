const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

function signToken(userId) {
  return jwt.sign({ userId }, process.env.TOKEN_KEY, {
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
    if (!req.body.email.match(regexEmail)) {
      throw "Cet email n'est pas valide"
    }

    bcrypt.hash(req.body.password, 10).then(async (hash) => {
      const user = await User.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
      })
      const { id, firstName, lastName, email } = user.toJSON()
      const token = signToken(id)
      res.json({ id, firstName, lastName, email, token })
    })
  } catch (error) {
    res.status(400).json({ error })
    console.log(error)
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

exports.modifyUser = async (req, res, next) => {
  try {
    if (!req.body.email.match(regexEmail)) {
      throw "Cet email n'est pas valide"
    }
    const hash = await bcrypt.hash(req.body.password, 10)
    await User.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
      },
      {
        where: {
          id: req.userId,
        },
      }
    )
    const updatedUser = await User.findOne({
      where: { id: req.userId },
    })
    console.log(updatedUser.firstName)
    const { id, firstName, lastName, email } = updatedUser.toJSON()
    const token = signToken(id)
    res.status(200).json({ id, firstName, lastName, email, token })
  } catch (error) {
    res.status(400).send({ error })
    console.error(error)
  }
}

exports.deleteUser = async (req, res, next) => {
  try {
    const success = await User.destroy({
      where: {
        id: req.userId,
      },
    })
    if (!success) {
      throw 'Echec de suppression'
    }
    res.status(200).send()
  } catch (error) {
    res.status(400).send({ error })
    console.error(error)
  }
}
