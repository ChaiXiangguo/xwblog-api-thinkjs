'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction(){
    let user = await this.session('user')
    // console.debug(this.cookie('sessionId'))
    this.success(_.omit(user, 'password'))
  }

  async signinAction(){
    let data = _.pick(this.post(), 'account', 'password')

    let user = await this.model('user').setRelation(false).getUser({account: data.account})

    if (think.isEmpty(user)) {
      this.status(400).fail('用户不存在')
    }

    if (user.password !== encryptPasswordMd5(data.password, user.salt)) {
      this.status(400).fail('密码错误')
    }

    this.session('user', user)

    this.success(_.omit(user, 'password'))
  }

  async signupAction(){
    let data = _.pick(this.post(), 'account', 'nickname', 'password')

    let user = await his.model('user').setRelation(false).getUser({account: data.account})

    if (!think.isEmpty(user)) {
      this.status(400).fail(`账户名为${account}的用户已存在`)
    }

    let salt = createSalt()
    user = {
      account: data.account,
      nickname: data.nickname || data.account,
      headimgurl: '/static/img/user.png',
      password: encryptPasswordMd5(data.password, salt),
      salt
    }

    let userId = await this.model('user').add(user)

    user = await his.model('user').setRelation(false).getUser({id: userId})

    this.session('user', user)

    this.success(_.omit(user, 'password'))
  }

}
