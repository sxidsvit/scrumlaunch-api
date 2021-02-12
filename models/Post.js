const { Schema, model, Types } = require('mongoose')

//  Basic schema for Link
const schema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  owner: { type: Types.ObjectId, ref: 'User' }
})

// eporting the Link model that the schema describes
module.exports = model('Post', schema)
