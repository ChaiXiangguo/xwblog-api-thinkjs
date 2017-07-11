'use strict';

/**
 * session configs
 */
export default {
  name: 'sessionId',
  type: 'redis',
  secret: 'xwblog',
  timeout: 24 * 3600,
  cookie: { // cookie options
    domain: "",
    path: "/", // cookie path
    httponly: true, //是否 httponly
    secure: false, //是否在 https 下使用
    timeout: 86400 //cookie 有效时间
  }
};
