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
    this.tableName = 'article';
    this.relation = {
      user: {
        type: think.model.BELONG_TO,
        relation: false,
        model: 'user',
        key: 'userId'
      },
      comment:{
        type: think.model.HAS_MANY,
        relation: false,
        model: 'comment',
        fKey: 'articleId',
        field: 'id,content'
      }
    }
  }
}
