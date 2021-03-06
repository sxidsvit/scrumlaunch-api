const { Schema, model, Types } = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

//  Basic schema for Link
const schema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  editededAt: { type: Date, default: null },
  owner: { type: Types.ObjectId, ref: 'User' }
})

schema.plugin(mongoosePaginate)

// eporting the Post model that the schema describes
module.exports = model('Post', schema)
