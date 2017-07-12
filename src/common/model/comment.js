'use strict';
/**
 * relation model
 */
export default class extends think.model.relation {

  schema = {
    updateTime: {
      default: () => {
        return think.datetime();
      },
      update: true
    },
    createTime: {
      default: () => {
        return think.datetime();
      },
      readonly: true
    }
  }

  /**
   * init
   * @param  {} args []
   * @return {}         []
   */
  init(...args){
    super.init(...args);
    this.tableName = 'comment';
    this.relation = {
      user: {
        type: think.model.BELONG_TO,
        relation: false,
        model: 'user',
        key: 'userId',
        field: 'id,account,nickname,headimgurl'
      },
      article: {
        type: think.model.BELONG_TO,
        relation: false,
        model: 'article',
        key: 'articleId'
      }
    }
  }

  getDetail(condition) {
    let newCondition = _.assign({status: ['>', -1]}, condition)
    return this.where(newCondition).find()
  }

  getList(condition, currentPage, numsPerPage) {
    let newCondition = _.assign({status: ['>', -1]}, condition)
    return this.where(newCondition).order('createTime DESC').page(currentPage, numsPerPage).countSelect()
  }
}
