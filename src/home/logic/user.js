'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
import Base from './base.js';
export default class extends Base {
  /**
   * index action logic
   * @return {} []
   */
  postAction(){
    this.rules = {
      username: "required",
      password: "required"
    }
  }
}
