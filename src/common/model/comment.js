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
        key: 'userId'
      },
      article: {
        type: think.model.BELONG_TO,
        relation: false,
        model: 'article',
        key: 'articleId'
      }
    }
  }
}
