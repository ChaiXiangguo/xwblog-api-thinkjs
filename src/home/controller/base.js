'use strict';

export default class extends think.controller.base {
  /**
   * some base method in here
   */
  async __before() {

    //TODO 在其他地方修改用户时 更新用户session
    await this.debug();

    await this.unlogin();
  }

  async debug() {

    if (isDebug(this.userAgent())) {
      //指定用户身份
      let user = await this.model('user').setRelation(false).getDetail({id: this.get('userId') || this.config('debug').userId});
      await this.session('user', user);
    }

    if (isDev()) {
      if (this.isGet() || !think.isEmpty(this.get())) {
        console.debug("get/del参数：", this.get())
      }

      if (this.isPost() || !think.isEmpty(this.post())) {
        console.debug("post/put参数：", this.post())
      }
    }
  }

  async unlogin() {
    if (this.http.controller === 'user' && (this.http.action === 'signin' || this.http.action === 'signup' )) return;
    let user = await this.session('user');
    if (think.isEmpty(user)) {
      return this.status(401).fail('请重新登录');
    }
  }
}
