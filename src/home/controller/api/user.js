'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async getAction(){
    if (this.user !== '') {
      delete this.user._id
      return this.json({'user' : this.user});
    } else {
      let user = await this.modelInstance.findUser({username:this.get('username')})
      if (user.password === think.md5(this.get('password') + this.key)) {
        this.user = user
      } else {
        return this.json({'err': '用户名密码错误'});
      }
      let expires = Date.parse(new Date()) + 7 * 24 * 3600 * 1000;
      let token = this.get('username') + '-' + expires + '-' + think.md5(user.password + this.key)
      user = {
        username: this.user.username,
        nickname: this.user.nickname,
        image: this.user.image
      }
      return this.json({'user' : user, 'token' : token})
    }
  }
  async postAction(){
    let user = {
      username: this.post('username'),
      password: think.md5(this.post('password') + this.key),
      nickname: this.post('username'),
      image: '/static/img/user.png',
      create_time: Date.parse(new Date()),
      update_time: Date.parse(new Date())
    }
    await this.modelInstance.addUser(user)
    let expires = Date.parse(new Date()) + 7 * 24 * 3600 * 1000
    let token = this.post('username') + '-' + expires + '-' + think.md5(user.password + this.key)
    delete user.password
    delete user.create_time
    delete user.update_time
    return this.json({'user' : user, 'token' : token});
  }
}
