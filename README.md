# xwblog api thinkjs版

## 简介
xwblog 是使用 Node.js + Mysql + Redis + 其它客户端框架开发的个人博客系统,前后端分离.    
客户端有: [vue 版](https://github.com/xwlyy/xwblog-home-vue)    
##### 此为服务端Thinkjs版, 为客户端提供api.

## 功能
- 用户登录注册
- 新建编辑文章
- 评论
- 貌似功能有点少啊，以后有空再加吧

## 开发
```
$ git clone https://github.com/xwlyy/xwblog-api-thinkjs
$ cd xwblog-api-thinkjs
$ npm install
$ npm start
```

## 部署
用阿里云持续交付平台CRP实现持续集成、持续部署，免费的。当然跑项目用的服务还是得自己买。通过Nginx转发api请求。

## TODO
- 研究下单元测试、集成测试，还有什么e2e测试，乱七八糟一大堆，得好好看看《[饿了么大前端 Node.js 进阶教程](https://github.com/ElemeFE/node-interview)》
- thinkjs换成3.0版本
- 有空再研究下docker吧，貌似现阶段也没卵用（坑先挖着，管挖不管埋）
