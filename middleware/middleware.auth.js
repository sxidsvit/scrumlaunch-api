const jwt = require('jsonwebtoken')
const config = require('config')

module.exports = (req, res, next) => {
  if (req.methods === 'OPTIONS') {
    return next()
  }

  try {
    //  we extract information about the token from the request header to the server
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      // protection of links for unauthorized users
      return res.staus(401).json({ message: ' Token error. No authorization' })
    }

    // checking the token
    const secret = config.get('jwtSecret')

    jwt.verify(token, secret, function (err, decoded) {
      if (err) {
        console.log('jwt.verify() error: ', err);
      } else {
        req.user = decoded
        next()
      }
    })

  } catch (e) {
    res.status(401).json({ message: ' Token decoding error. No authorization' })
  }
}