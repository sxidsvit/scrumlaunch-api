const { Router } = require('express')
const bcrypt = require('bcryptjs')
const config = require('config');
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const router = Router()

router.post('/register',
  [
    check('name', 'The minimum name length must be 2 characters').isLength({ min: 2 }),
    check('password', 'The minimum password length must be 3 characters').isLength({ min: 3 }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect registration data'
        })
      }

      const { name, password } = req.body
      const candidate = await User.findOne({ name })
      if (candidate) {
        return res.status(400).json({ "message": "This user already exists" })
      }

      const hashedPassword = await bcrypt.hash(password, 12)
      const user = new User({ name, password: hashedPassword })
      await user.save()

      res.status(201).json({ message: 'User created' })


    } catch (e) {
      res.status(500).json({ message: 'Register: something went wrong. Try again ...' })
    }

  })

router.post('/login',
  [
    check('name', 'Incorrect name').exists(),
    check('password', 'Enter password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: 'Incorrect login data'
        })
      }

      const { name, password } = req.body

      const user = await User.findOne({ name })

      if (!user) {
        return req.status(400).json({ message: 'There is no user with this name' })
      }

      const isMatch = await bcrypt.compare(password, user.password)

      if (!isMatch) {
        return res.status(400).json({ message: 'Wrong password' })
      }

      const token = jwt.sign(
        { userId: user.id },
        config.get('jwtSecret'),
        { expiresIn: '24h' } // change for production !!!
      )

      res.status(200).json({ token, UserId: user.id })

    } catch (e) {
      res.status(500).json({ message: 'Login: something went wrong. Try again ...' })
    }

  }
)

module.exports = router