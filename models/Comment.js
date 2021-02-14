const { Schema, model, Types } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

//  Basic schema for Link
const schema = new Schema({
  parentId: { type: Types.ObjectId, ref: 'Post' },
  text: { type: String, required: true },
  owner: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  editededAt: { type: Date, default: null }
})

schema.plugin(mongoosePaginate)

// eporting the Post model that the schema describes
module.exports = model('Comment', schema)
