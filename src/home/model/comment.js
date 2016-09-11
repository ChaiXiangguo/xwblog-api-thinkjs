// model/use.js

//import Base from "./base";
import mongoose from "mongoose"
let commentSchema = new mongoose.Schema({
  blog_id: String,
  content: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  create_time: Number
}, {
  collection: 'comment',
  versionKey: false
})
let commentModel = mongoose.model('comment', commentSchema)
export default class extends think.base {
  findComments(where = {}, page){
    //let Model = this.getModel();
    return commentModel.find(where).sort({
      create_time: -1
    }).skip(page.offset).limit(page.limit).populate({
      path: 'user', 
      select: {
        '_id': 0,
        'username': 1,
        'nickname':1,
        'image':1
      } 
    }).exec();
  }
  count(where = {}){
    //let Model = this.getModel();
    return commentModel.count(where).exec()
  }
  async addComment(data) {
    let newComment = new commentModel(data)
    let insertId = ''
    await newComment.save(function (err, result) {
      insertId = result._id
    })
    return insertId
  }
}
