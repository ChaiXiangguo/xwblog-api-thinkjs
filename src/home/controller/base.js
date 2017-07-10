'use strict';
/**
 * rest controller
 * @type {Class}
 */

export default class extends think.controller.rest {
  /**
   * init
   * @param  {Object} http []
   * @return {}      []
   */
  init(http){
    super.init(http);
  }
  /**
   * before magic method
   * @return {Promise} []
   */
  user = '';
  key = 'you will never guess';
  token = this.header("token");
  
  async __before(){
    
    if (this.token) {
      await this.parseToken();
    }
  }
  
  async parseToken(){
    let token = this.token.split('-');
    if (token[1]<Date.parse(new Date())) {
      return this.json({'err': '登录过期，请重新登录'});
    } else {
      let user = await this.model('user').findUser({username:token[0]})
      if (token[2] === think.md5(user.password + this.key)){
        user = {
          _id: user._id,
          username: user.username,
          nickname: user.nickname,
          image: user.image
        }
        this.user = user
      } else {
        return this.json({'err': 'token被篡改'});
      }
    }
  }
  checkLogin() {
    if (this.user === '') {
      return this.json({err: '非法操作'});
    }
  }
}
