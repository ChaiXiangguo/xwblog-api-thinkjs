'use strict';

import Base from './base.js';
import { getPage } from './page.js';

export default class extends Base {
  async getAction(){
    let count = await this.modelInstance.count({blog_id:this.get('_id')})
    let page = getPage(count, this.get('page'), this.get('size'));
    let comments = await this.modelInstance.findComments({blog_id:this.get('_id')}, page)
    return this.json({'comments' : comments, 'page': page});
  }
  async postAction(){
    this.checkLogin();
    let comment = {
      blog_id: this.post('_id'),
      content: this.post('content'),
      user: this.user._id,
      create_time: Date.parse(new Date())
    }
    let insertId = await this.modelInstance.addComment(comment);
    //comment = await this.modelInstance.where({_id: insertId}).find();
    comment._id = insertId
    let user = {
      username: this.user.username,
      nickname: this.user.nickname,
      image: this.user.image
    }
    comment.user = user
    return this.json({'comment' : [comment]});
  }
}
