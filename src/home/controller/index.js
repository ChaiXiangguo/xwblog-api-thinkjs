'use strict';

export default class extends think.controller.rest {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    return this.display();
  }

  async blogAction() {

    let blogs = await this.model('old_blog', 'mongo').select()
    console.debug(blogs)
    this.success(blogs)
  }
}
