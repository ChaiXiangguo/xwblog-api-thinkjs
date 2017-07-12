'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
import Base from './base.js';
export default class extends Base {

  signinAction(){
    this.rules = {
      account: "required",
      password: "required"
    }
  }

  signupAction(){
    this.rules = {
      account: "required",
      password: "required"
    }
  }

  modifyAction(){
    this.rules = {
      nickname: "requiredWithoutAll:headimgurl"
    }
  }

  passwordAction(){
    this.rules = {
      password: "required",
      newPassword: "required"
    }
  }
}
