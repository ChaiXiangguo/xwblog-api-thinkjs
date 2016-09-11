// model/blog.js

//import Base from "./base";
import mongoose from "mongoose"
let blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
  create_time: Number,
  update_time: Number
}, {
  collection: 'blog',
  versionKey: false
})
let blogModel = mongoose.model('blog', blogSchema)
export default class extends think.base {
  findBlogs(page){
    //let Model = this.getModel();
    return blogModel.find().sort({
      create_time: -1
    }).skip(page.offset).limit(page.limit).select({
      'user': 0
    }).exec()
  }
  count() {
    //let Model = this.getModel();
    return blogModel.count().exec();
  }
  findBlog(where){
    //let Model = this.getModel();
    return blogModel.findOne(where).populate({
      path: 'user', 
      select: {
        '_id': 0,
        'username': 1,
        'nickname':1,
        'image':1
      } 
    }).exec()
  }
  async addBlog(data) {
    let newBlog = new blogModel(data)
    let insertId = ''
    await newBlog.save(function (err, result) {
      insertId = result._id
    })
    return insertId
  }
  updateBlog(where, data) {
    blogModel.update(where, data).exec()
  }
}
