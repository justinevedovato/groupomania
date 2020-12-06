const bcrypt = require('bcrypt')
const User = require('../models/user')

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    User.create({
      username: req.body.username,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      password: hash,
    })
  })
}
// exports.login = (req, res, next) => {}
