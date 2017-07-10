'use strict';

import Base from './base.js';
import { getPage } from './page.js';
import mongoose from "mongoose"
mongoose.connect('mongodb://xwlyy:123456@ds017246.mlab.com:17246/awesome')
export default class extends Base {
  async getAction(){
    if (this.get('_id')) {
      let blog = await this.modelInstance.findBlog({_id:this.get('_id')})
      //let user = await this.model('user').where({_id:blog.user}).field('username,nickname,image').find()
      //delete user._id
      //blog.user = user
      return this.json({'blog' : blog});
    } else {
      let count = await this.modelInstance.count();
      let page = getPage(count, this.get('page'), this.get('size'));
      let blogs = await this.modelInstance.findBlogs(page)
      for (let blog of blogs) {
        if (blog.content.length > 200) {
          blog.content = blog.content.substr(0, 200) + '......'
        }
      }
      return this.json({'blogs' : blogs, 'page': page})
    }
  }
  async postAction(){
    this.checkLogin();
    if (this.post('_id') === 'new') {
      let data = {
        title: this.post('title'),
        content: this.post('content'),
        user: this.user._id,
        create_time: Date.parse(new Date()),
        update_time: Date.parse(new Date())
      }
      let insertId = await this.modelInstance.addBlog(data);
      return this.json({'blog_id': insertId});
    } else {
      let data = {
        title: this.post('title'),
        content: this.post('content'),
        update_time: Date.parse(new Date())
      }
      await this.modelInstance.updateBlog({_id: this.post('_id')}, data)
      return this.json({'blog_id': this.post('_id')});
    }
  }
}
