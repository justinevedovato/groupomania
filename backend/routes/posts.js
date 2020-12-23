const express = require('express')
const router = express.Router()
const db = require('../config/db')
const postCtrl = require('../controllers/post')
const auth = require('../middlewares/auth')

router.get('/', auth, postCtrl.getAllPosts)
router.post('/', auth, postCtrl.createPost)

router.post('/:id', auth, postCtrl.replyToPost)
router.get('/:id', auth, postCtrl.getPostAndReplies)
router.put('/:id', auth, postCtrl.modifyPost)
router.delete('/:id', auth, postCtrl.deletePost)

router.post('/:id/like', auth, postCtrl.likePost)

module.exports = router
