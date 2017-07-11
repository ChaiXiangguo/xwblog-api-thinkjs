'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    let user = await this.session('user')
    console.debug(this.cookie('sessionId'))
    console.debug(think.config('redis'))
    this.success(user)
  }

}
