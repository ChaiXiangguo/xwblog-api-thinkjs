'use strict';
/**
 * relation model
 */
export default class extends think.model.mongo {
  /**
   * init
   * @param  {} args []
   * @return {}         []
   */
  init(...args) {
    super.init(...args);
    this.tableName = 'blog';
  }
}
