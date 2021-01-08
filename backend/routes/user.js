const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.delete('/account', auth, userCtrl.deleteUser)
router.put('/account', auth, userCtrl.modifyUser)

module.exports = router
