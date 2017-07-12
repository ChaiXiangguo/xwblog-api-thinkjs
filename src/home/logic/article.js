'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
import Base from './base.js';
export default class extends Base {

  detailAction(){
    this.rules = {
      id: "required"
    }
  }

  addAction(){
    this.rules = {
      title: "required",
      content: "required"
    }
  }

  modifyAction(){
    this.rules = {
      id: "required",
      title: "requiredWithoutAll:content"
    }
  }

  deleteAction(){
    this.rules = {
      id: "required"
    }
  }
}
