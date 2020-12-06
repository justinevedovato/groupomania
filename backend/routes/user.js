const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')

router.post('/signup')
router.post('/login')
module.exports = router
