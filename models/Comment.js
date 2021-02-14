const { Schema, model, Types } = require('mongoose')

//  Basic schema for Link
const schema = new Schema({
  parentId: { type: Types.ObjectId, ref: 'Post' },
  text: { type: String, required: true },
  owner: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  editededAt: { type: Date, default: null }
})


// eporting the Post model that the schema describes
module.exports = model('Comment', schema)
