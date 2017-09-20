'use strict';

import Base from './base.js';
import xss from 'xss'

export default class extends Base {
  /**
   * detail action
   * 获取文章详情
   */
  async detailAction(){

    let id = this.get('id')
    let result = await this.model('article').setRelation('user').getDetail({id})
    result.createTime = new Date(result.createTime).getTime()
    return this.success(result)
  }

  /**
   * list action
   * 获取文章列表
   */
  async listAction(){
    let data = _.pick(this.get(), 'userId')

    let currentPage = this.get('currentPage') || 1;
    let numsPerPage = this.get('numsPerPage') || 10;

    let result = await this.model('article').setRelation('user').getList(data, currentPage, numsPerPage)

    result.data.map(item => {
      item.createTime = new Date(item.createTime).getTime()
    })

    return this.success(result)
  }

  /**
   * add action
   * 修改文章
   */
  async addAction(){
    let data = _.pick(this.post(), 'title', 'content')
    data.content = xss(data.content)

    let user = await this.session('user')
    data.userId = user.id
    data.digest = data.content.length <= 40?data.content:data.content.substr(0, 40)+'...'

    let articleId = await this.model('article').add(data)

    return this.success({articleId})
  }

  /**
   * modify action
   * 修改文章
   */
  async modifyAction(){
    let data = _.pick(this.post(), 'id', 'title', 'content')
    data.content = xss(data.content)

    let user = await this.session('user')

    let article = await this.model('article').getDetail({id: data.id})

    if (article.userId !== user.id) {
      return this.status(400).fail('禁止修改别人的文章')
    }

    await this.model('article').update(data)

    return this.success(isDev() && data, '文章修改成功')
  }

  /**
   * delete action
   * 删除文章
   */
  async deleteAction(){
    let data = _.pick(this.get(), 'id')

    let user = await this.session('user')

    let article = await this.model('article').getDetail({id: data.id})

    if (article.userId !== user.id) {
      return this.status(400).fail('禁止删除别人的文章')
    }

    await this.model('article').where({id: data.id}).update({status: -1})

    return this.success(isDev() && data, '文章删除成功')
  }

}
