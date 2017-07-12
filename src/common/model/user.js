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
    this.tableName = 'user';
    this.relation = {
      article: {
        type: think.model.HAS_MANY,
        relation: false,
        fKey: 'userId',
        field: 'id,digest'
      },
      comment:{
        type: think.model.HAS_MANY,
        relation: false,
        model: 'comment',
        fKey: 'userId',
        field: 'id,content'
      }
    }
  }

  getDetail(condition) {
    return this.where(condition).find()
  }
}
