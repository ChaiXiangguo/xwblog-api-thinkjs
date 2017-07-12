'use strict';

import Base from './base.js';

export default class extends Base {

  /**
   * add action
   * 添加评论
   */
  async addAction(){
    let data = _.pick(this.post(), 'articleId', 'content')

    let user = await this.session('user')
    data.userId = user.id

    await this.model('comment').add(data)

    return this.success(isDev() && data, '评论添加成功')
  }

  /**
   * modify action
   * 修改评论
   */
  async modifyAction(){
    let data = _.pick(this.post(), 'id', 'content')

    let user = await this.session('user')

    let comment = await this.model('comment').getDetail({id: data.id})

    if (comment.userId !== user.id) {
      return this.status(400).fail('禁止修改别人的评论')
    }

    await this.model('comment').update(data)

    return this.success(isDev() && data, '评论修改成功')
  }

  /**
   * delete action
   * 删除评论
   */
  async deleteAction(){
    let data = _.pick(this.get(), 'id')

    let user = await this.session('user')

    let comment = await this.model('comment').getDetail({id: data.id})

    if (comment.userId !== user.id) {
      return this.status(400).fail('禁止删除别人的评论')
    }

    await this.model('comment').where({id: data.id}).update({status: -1})

    return this.success(isDev() && data, '评论删除成功')
  }

}
