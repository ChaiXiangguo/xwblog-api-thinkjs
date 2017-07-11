"use strict";

import fs from 'fs';
import util from 'util';
import log4js from 'log4js';

const info = require('../../../package.json');

if (!fs.existsSync('./logs')) fs.mkdirSync('./logs');

log4js.configure({ // 输出类型
  appenders: [
    {
      category: 'console',
      type: 'console'
    },
    {
      category: 'server',
      type: 'dateFile',
      filename: './logs/log',
      alwaysIncludePattern: true,
      pattern: '-yyyy-MM-dd.log'
    }
  ],
  replaceConsole: true,
  levels: {
    'console': 'ALL',
    'server': 'ALL'
  }
});

let logServer = log4js.getLogger('server')

let consoleLog = console.log
console.log = function (...args) {
  consoleLog.apply(console, args)
  logServer.info.apply(logServer, args)
};

let consoleDebug = console.debug
console.debug = function (...args) {
  if (true || global.loglevel != 'info') {
    consoleDebug.apply(console, args)
  }

  logServer.debug.apply(logServer, args)
};

let consoleWarn = console.warn
console.warn = function (...args) {
  if (true || global.loglevel != 'info') {
    consoleWarn.apply(console, args)
  }

  logServer.warn.apply(logServer, args)
};

let consoleError = console.error
console.error = function (...args) {
  consoleError.apply(console, args)
  logServer.error.apply(logServer, args)

  console.debug('in error');
  if (process.env.NODE_ENV === 'production') {
    let time = `\ntime:${think.datetime()}`
    let serverInfo = `\nname: ${info.name}\nversion: ${info.version}\n\n`
    let message = time + serverInfo + util.format.apply(util, args)

    console.debug('error', message)
  }
};

process.on('uncaughtException', function (err) {
  console.error('uncaughtException: \n' + err.stack)
})

process.on('unhandledRejection: \n', (reason, p) => {
  console.error('unhandledRejection: \n' + reason, p);
})

process.on('error', function (err) {
  console.error('error: \n' + err.stack)
})
