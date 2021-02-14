const { Router } = require('express')
const router = Router()
const config = require('config')
const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const auth = require('../middleware/middleware.auth')

// Create post by  authorized user
router.post('/create', auth, async (req, res) => {
  try {
    const { title, text, userId } = req.body // original uncoded link
    const postObj = {
      title, text, owner: req.user.userId
    }
    const post = new Post(postObj)

    post.save()

    res.status(201).json({ post })

  } catch (e) {
    res.status(500).json({ message: 'Post create: something went wrong. Try again ...' })
  }
})

// Edit post by id for authorized user
router.post('/edit/:id', auth, async (req, res) => {
  try {
    let editedPost = {}
    if (req.body.title) editedPost = { ...editedPost, title: req.body.title }
    if (req.body.text) editedPost = { ...editedPost, text: req.body.text }
    const post = await Post.updateOne(
      { _id: req.params.id }, { ...editedPost, editededAt: Date.now() })
    res.status(200).json({ message: 'Editing  ok! ' })
  } catch (e) {
    res.status(500).json({ message: 'Editing posts by id: something went wrong. Try again ...' })
  }
})

//  Delete post by id for authorized user
router.post('/delete/:id', auth, async (req, res) => {
  try {
    const post = await Post.deleteOne({ _id: req.params.id })
    res.json(post)
  } catch (e) {
    res.status(500).json({ message: 'Deleting posts by id: something went wrong. Try again ...' })
  }
})


// Get all posts 
router.get('/', async (req, res) => {
  try {
    const perPage = req.query.page ? 10 : 1000000000
    const options = {
      page: `${req.query.page}`,
      limit: `${Number(perPage)}`,
      collation: {
        locale: 'en',
      },
    };
    const { docs: posts, ...pagination } = await Post.paginate({}, options)
    const truncatedPosts = posts.map(post => ({ id: post._id, title: post.title }))
    res.json({ posts: truncatedPosts, pagination })
  } catch (e) {
    res.status(500).json({ message: 'Get posts: something went wrong. Try again ...' })
  }

})

//  Get post by id for authorized user & post's comments
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const user = await User.findById(post.owner)

    const perPage = req.query.page ? 10 : 1000000000
    const options = {
      page: `${req.query.page}`,
      limit: `${Number(perPage)}`,
      collation: {
        locale: 'en',
      },
    };

    const { docs: comments, ...pagination } = await Comment.paginate({}, options)
    const commentsDetails = comments.map(comment => (
      { creatorName: comment.owner, text: comment.text }))
    const postInfo = {
      id: post._id,
      creatorName: user.name,
      title: post.title
    }
    res.json({ post: postInfo, comments: commentsDetails, pagination })
  } catch (e) {
    res.status(500).json({ message: 'Get posts by id: something went wrong. Try again ...' })
  }
})

//  ADDITIONAL API 

// Get authorized user' all posts  
router.get('/auth/', auth, async (req, res) => {
  try {
    // get userId from request object
    const posts = await Post.find({ owner: req.user.userId })
    res.json(posts)
  } catch (e) {
    res.status(500).json({ message: 'Get posts: something went wrong. Try again ...' })
  }
})




module.exports = router