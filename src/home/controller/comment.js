'use strict';

import Base from './base.js';
import xss from 'xss'

export default class extends Base {

  /**
   * list action
   * 获取评论列表
   */
  async listAction(){
    let data = _.pick(this.get(), 'articleId')

    let currentPage = this.get('currentPage') || 1;
    let numsPerPage = this.get('numsPerPage') || 10;

    let result = await this.model('comment').setRelation('user').getList(data, currentPage, numsPerPage)

    result.data.map(item => {
      item.createTime = new Date(item.createTime).getTime()
    })

    return this.success(result)
  }

  /**
   * add action
   * 添加评论
   */
  async addAction(){
    let data = _.pick(this.post(), 'articleId', 'content')
    data.content = xss(data.content)

    let user = await this.session('user')
    data.userId = user.id

    let commentId = await this.model('comment').add(data)
    data = await this.model('comment').getDetail({id: commentId})

    return this.success(data)
  }

  /**
   * modify action
   * 修改评论
   */
  async modifyAction(){
    let data = _.pick(this.post(), 'id', 'content')
    data.content = xss(data.content)

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
