'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * 获取当前用户信息
   */
  async indexAction(){
    let user = await this.session('user')
    // console.debug(this.cookie('sessionId'))
    return this.success(_.omit(user, 'password'))
  }

  /**
   * signin action
   * 登录
   */
  async signinAction(){
    let data = _.pick(this.post(), 'account', 'password')

    let user = await this.model('user').setRelation(false).getUser({account: data.account})

    if (think.isEmpty(user)) {
      return this.status(400).fail('用户不存在')
    }

    if (user.salt === 'you will never guess') {//以前挖的坑，慢慢填吧-_-
      data.password = frontMd5(data.account, data.password)
    }

    if (user.password !== encryptPasswordMd5(data.password, user.salt)) {
      return this.status(400).fail('密码错误')
    }

    await this.session('user', user)

    return this.success('/home/index', "登录成功")
  }

  /**
   * signup action
   * 注册
   */
  async signupAction(){
    let data = _.pick(this.post(), 'account', 'nickname', 'password')

    let user = await this.model('user').setRelation(false).getUser({account: data.account})

    if (!think.isEmpty(user)) {
      return this.status(400).fail(`账户名为${data.account}的用户已存在`)
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

    user = await this.model('user').setRelation(false).getUser({id: userId})

    await this.session('user', user)

    return this.success('/home/index', "注册成功")
  }

  /**
   * signout action
   * 登出
   */
  async signoutAction(){
    await this.session();
    return this.success('/', '登出成功')
  }

  /**
   * modify action
   * 修改当前用户信息
   */
  async modifyAction(){
    let data = _.pick(this.post(), 'nickname', 'headimgurl')

    let user = await this.session('user')

    await this.model('user').where({id: user.id}).update(data)

    user = await this.model('user').setRelation(false).getUser({id: user.id})

    await this.session('user', user)

    return this.success(isDev() && data, '用户信息修改成功')
  }

  /**
   * password action
   * 修改当前用户密码
   */
  async passwordAction(){
    let data = _.pick(this.post(), 'password', 'newPassword')

    let user = await this.session('user')

    if (user.salt === 'you will never guess') {//改了密码后更新salt，慢慢填坑
      data.password = frontMd5(user.account, data.password)
      data.salt = createSalt()
    }

    if (encryptPasswordMd5(data.password, user.salt) !== user.password) {
      return this.status(400).fail('密码错误')
    }

    data.password = encryptPasswordMd5(data.newPassword, data.salt?data.salt:user.salt)
    delete data.newPassword

    await this.model('user').where({id: user.id}).update(data)

    user = await this.model('user').setRelation(false).getUser({id: user.id})

    await this.session('user', user)

    return this.success(isDev() && data, '密码修改成功')
  }

}
