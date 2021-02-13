const { Router } = require('express')
const router = Router()
const config = require('config')
const Comment = require('../models/Comment')
const auth = require('../middleware/middleware.auth')

// Create post by  authorized user
router.post('/create', auth, async (req, res) => {
  try {
    const { text, parentId } = req.body // original uncoded link
    const postObj = {
      parentId: req.body.parentId, text, owner: req.user.userId
    }
    const comment = new Comment(postObj)

    comment.save()

    res.status(201).json({ comment })

  } catch (e) {
    res.status(500).json({ message: 'Comment create: something went wrong. Try again ...' })
  }
})

// Edit post by id for authorized user
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

//  Delete post by id for authorized user
router.post('/delete/:id', auth, async (req, res) => {
  try {
    const comment = await Comment.deleteOne({ _id: req.params.id })
    res.json(comment)
  } catch (e) {
    res.status(500).json({ message: 'Deleting comment by id: something went wrong. Try again ...' })
  }
})


// Get authorized user' all posts for authorized user
router.get('/', auth, async (req, res) => {
  try {
    // get userId from request object
    const comment = await Comment.find({ owner: req.user.userId })
    res.json(comment)
  } catch (e) {
    res.status(500).json({ message: 'Get posts: something went wrong. Try again ...' })
  }

})

//  Get post by id for authorized user
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Comment.findById(req.params.id)
    res.json(post)
  } catch (e) {
    res.status(500).json({ message: 'Get posts by id: something went wrong. Try again ...' })
  }
})




module.exports = router