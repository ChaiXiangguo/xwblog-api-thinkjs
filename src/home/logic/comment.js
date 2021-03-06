'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
import Base from './base.js';
export default class extends Base {

  addAction(){
    this.rules = {
      articleId: "required",
      content: "required"
    }
  }

  modifyAction(){
    this.rules = {
      id: "required",
      content: "required"
    }
  }

  deleteAction(){
    this.rules = {
      id: "required"
    }
  }
}
