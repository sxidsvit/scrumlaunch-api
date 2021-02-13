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
    const posts = await Post.find({})
    const truncatedPosts = posts.map(post => ({ id: post._id, title: post.title }))
    res.json(truncatedPosts)
  } catch (e) {
    res.status(500).json({ message: 'Get posts: something went wrong. Try again ...' })
  }

})

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

//  Get post by id for authorized user & post's comments
router.get('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    // console.log('post id: ', post._id);
    let comments = await Comment.find({ parentId: post._id })

    const truncated = (comment) => {
      {
        const text = comment.text
        console.log('truncated - text: ', text);
        // const author = await User.findById(comment.owner)
        // console.log('author: ', author.email);
        // return { text, author: author.emai }
        return { text }
      }
    }
    const truncatedComment = comments
      .map(comment => truncated(comment))

    res.json({ post, comments: truncatedComment })
  } catch (e) {
    res.status(500).json({ message: 'Get posts by id: something went wrong. Try again ...' })
  }
})




module.exports = router