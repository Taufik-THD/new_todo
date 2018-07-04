const mongoose = require('mongoose');
const Schema = mongoose.Schema

const todoSchema = new Schema({
  activity: { type: String },
  status: { type: Boolean },
  deadline: { type: String },
  UserId: { type: Schema.Types.ObjectId, ref: 'User' },
  description: { type:String }
},{
  timestamps: true
})

const todo = mongoose.model('Todo', todoSchema)

module.exports = todo;
