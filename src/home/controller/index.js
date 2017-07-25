'use strict';

// import Promise from "bluebird"

export default class extends think.controller.base {
  /**
   * index action
   * @return {Promise} []
   */
  // indexAction(){
  //   return this.display();
  // }

  /**
   * article action
   * 迁移文章
   */
  async article() {

    think.log('move article from mongo to mysql start');

    let articles = await this.model('old_article', 'mongo').select().map(article => ({
      mongoId: String(article._id),
      userMongoId: String(article.user),
      title: article.title,
      content: article.content,
      digest: article.content.length <= 40?article.content:article.content.substr(0, 40)+'...',
      createTime: think.datetime(new Date(article.create_time || null)),
      updateTime: think.datetime(new Date(article.update_time || null))
    }))

    console.debug(articles)

    await this.model('article').addMany(articles, null, true).catch(console.error);

    think.log('move article from mongo to mysql end');

    // this.success('article move success')
  }

  /**
   * comment action
   * 迁移文章
   */
  async comment() {

    think.log('move comment from mongo to mysql start');

    let comments = await this.model('old_comment', 'mongo').select().map(comment => ({
      mongoId: String(comment._id),
      userMongoId: String(comment.user),
      articleMongoId: comment.blog_id,
      content: comment.content,
      createTime: think.datetime(new Date(comment.create_time || null)),
      updateTime: think.datetime(new Date(comment.update_time || null))
    }))

    console.debug(comments)

    await this.model('comment').addMany(comments, null, true).catch(console.error);

    think.log('move comment from mongo to mysql end');

    // this.success('comment move success')
  }

  /**
   * user action
   * 迁移用户
   */
  async user() {

    think.log('move user from mongo to mysql start');

    let users = await this.model('old_user', 'mongo').select()

    for (let i = 0; i < users.length; i++) {
      for (let j = i+1; j < users.length; j++) {
        if (users[i].username === users[j].username) {
          users[j].username = users[j].username + '_' + users[j].create_time
        }
      }
    }

    users = users.map(user => ({
      mongoId: String(user._id),
      account: user.username,
      nickname: user.nickname,
      headimgurl: user.image,
      password: user.password,
      createTime: think.datetime(new Date(user.create_time || null)),
      updateTime: think.datetime(new Date(user.update_time || null))
    }))

    console.debug(users)

    await this.model('user').addMany(users, null, true).catch(console.error);

    think.log('move user from mongo to mysql end');

    // this.success('user move success')
  }

  /**
   * id action
   * 迁移id
   */
  async relation() {

    think.log('move id start');

    let articles = await this.model('article').setRelation(false).alias("article").join({
      table: "user",
      join: "inner",
      as: "user",
      on: ["article.userMongoId", "user.mongoId"]
    }).field([
      'article.id',
      'user.id as userId',
      'article.updateTime'
    ]).select()

    await this.model('article').updateMany(articles, null, true).catch(console.error);

    let comments = await this.model('comment').alias("comment").join({
      table: "user",
      join: "inner",
      as: "user",
      on: ["comment.userMongoId", "user.mongoId"]
    }).join({
      table: "article",
      join: "inner",
      as: "article",
      on: ["comment.articleMongoId", "article.mongoId"]
    }).field([
      'comment.id',
      'user.id as userId',
      'article.id as articleId',
      'comment.updateTime'
    ]).select()

    await this.model('comment').updateMany(comments).catch(console.error);

    think.log('move id end');

    // this.success('id move success')
  }

  // async migrateAction() {
  //   await this.article()
  //   await this.user()
  //   await this.comment()
  //   await this.relation()
  //
  //   this.success('migrate success')
  // }
}
