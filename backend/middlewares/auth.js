const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw 'access denied'
    }
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, process.env.TOKEN_KEY)
    const userId = decodedToken.userId
    if (!userId) {
      throw 'Accès non autorisé'
    } else {
      req.userId = userId
      next()
    }
  } catch (error) {
    console.log(error)
    res.status(401).json({ error })
  }
}
