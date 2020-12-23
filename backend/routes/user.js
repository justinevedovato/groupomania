const express = require('express')
const router = express.Router()
const userCtrl = require('../controllers/user')
const multer = require('../middlewares/multer-config')

router.post('/signup', multer, userCtrl.signup)
router.post('/login', userCtrl.login)

module.exports = router

// update profile, formulaire pré-rempli pour mettre à jour le profil
// suppression du profil
// Rdv lundi 28 à 13h mentorat
