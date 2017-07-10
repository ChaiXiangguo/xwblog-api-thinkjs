'use strict';
/**
 * db config
 * @type {Object}
 */
export default {
  type: 'mysql',
  log_sql: true,
  log_connect: true,
  connectionLimit: 10, //建立 10 个连接
  adapter: {
    mysql: {
      host: '121.41.23.225',
      port: '3316',
      database: 'xwblog',
      user: 'xwlyy',
      password: '123456',
      prefix: 'xw_',
      encoding: 'UTF8MB4_GENERAL_CI'
    },
    mongo: {
      type: 'mongo',
      host: 'ds017246.mlab.com',
      port: '17246',
      database: 'awesome',
      user: 'xwlyy',
      password: '123456'
    }
  }
};
