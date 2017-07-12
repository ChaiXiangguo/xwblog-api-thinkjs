'use strict'

import lodash from 'lodash';
import crypto from 'crypto';
// import utility from 'utility';

global._ = lodash;

/**
 * 验证时否是调试用户
 */
global.isDebug = (agent = '') => {
  let flag = false;
  agent = agent.toLowerCase();
  let key = ["debug"];
  for (let item of key) {
    if (agent.indexOf(item) > -1) {
      flag = true;
      break;
    }
  }

  return flag;
};

global.isDev = () => {
  // return true
  return think.env == 'development';
};

global.frontMd5 = (str, key) => {//之前自己挖的坑，在前端把账户名和密码先md5加密一遍传给后端，这坑以后想办法填，先这样吧
  let hash = crypto.createHash('md5')
  return hash.update(str + key).digest('hex')
}

global.encryptPasswordMd5 = function (password, salt) {
  return think.md5(password + salt.trim());
};

global.createSalt = function () {
  return crypto.randomBytes(30).toString('hex');
};
