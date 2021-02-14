const { Router } = require('express')
const router = Router()
const config = require('config')
const Comment = require('../models/Comment')
const User = require('../models/User')
const auth = require('../middleware/middleware.auth')

// Create a comment by authorized user
router.post('/create', auth, async (req, res) => {
  try {
    const { text, parentId } = req.body
    const user = await User.findById(req.user.userId)
    const postObj = {
      parentId: req.body.parentId, text, owner: user.name
    }
    const comment = new Comment(postObj)

    comment.save()

    res.status(201).json({ comment })

  } catch (e) {
    res.status(500).json({ message: 'Comment create: something went wrong. Try again ...' })
  }
})

// Create a comment to a comment by authorized user
router.post('/create-comment', auth, async (req, res) => {
  try {
    const { text, parentId } = req.body
    const user = await User.findById(req.user.userId)
    const postObj = {
      parentId: req.body.parentId, text, owner: user.name
    }
    const comment = new Comment(postObj)

    comment.save()

    res.status(201).json({ comment })

  } catch (e) {
    res.status(500).json({ message: 'Comment create: something went wrong. Try again ...' })
  }
})

// Edit a comment by id for authorized user
router.post('/edit/:id', auth, async (req, res) => {
  try {
    let editedComment = {}
    if (req.body.text) editedComment = { ...editedComment, text: req.body.text }
    const comment = await Comment.updateOne(
      { _id: req.params.id }, { ...editedComment, editededAt: Date.now() })
    res.status(200).json({ message: 'Editing  ok! ' })
  } catch (e) {
    res.status(500).json({ message: 'Editing comment by id: something went wrong. Try again ...' })
  }
})

//  Delete a comment by id for authorized user
router.post('/delete/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.deleteOne({ _id: req.params.id })
    res.json(comment)
  } catch (e) {
    res.status(500).json({ message: 'Deleting comment by id: something went wrong. Try again ...' })
  }
})


// Get all comments for authorized user
router.get('/', auth, async (req, res) => {
  try {
    // get userId from request object
    const user = await User.findById(req.user.userId)
    // get user's comments
    const comment = await Comment.find({ owner: user.name })
    res.json(comment)
  } catch (e) {
    res.status(500).json({ message: 'Get posts: something went wrong. Try again ...' })
  }
})


module.exports = router