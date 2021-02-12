const { Router } = require('express')
const router = Router()
const config = require('config')
const Post = require('../models/Post')
const auth = require('../middleware/middleware.auth')

// Create post by  authorized user
router.post('/create', auth, async (req, res) => {
  try {
    const { title, text, userId } = req.body // original uncoded link
    const postObj = {
      title, text, createdAt: new Date().toLocaleString(), owner: req.user.userId
    }
    const post = new Post(postObj)

    post.save()

    res.status(201).json({ post })

  } catch (e) {
    res.status(500).json({ message: 'Post create: something went wrong. Try again ...' })
  }
})

// Get authorized user' all posts for authorized user
router.get('/', auth, async (req, res) => {
  try {
    // get userId from request object
    const posts = await Post.find({ owner: req.user.userId })
    res.json(posts)
  } catch (e) {
    res.status(500).json({ message: 'Get posts: something went wrong. Try again ...' })
  }

})

//  Get post by id for authorized user
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    res.json(post)
  } catch (e) {
    res.status(500).json({ message: 'Get posts by id: something went wrong. Try again ...' })
  }
})


module.exports = router