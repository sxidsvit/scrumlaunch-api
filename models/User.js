const { Schema, model, Types } = require('mongoose')

//  Basic schema for User
const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
})

// eporting the User model that the schema describes
module.exports = model('User', schema)