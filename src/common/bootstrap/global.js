'use strict'

import lodash from 'lodash';
import crypto from 'crypto';
import utility from 'utility';

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
