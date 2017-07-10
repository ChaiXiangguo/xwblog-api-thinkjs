'use strict';
/**
 * logic
 * @param  {} []
 * @return {}     []
 */
export default class extends think.logic.base {
  /**
   * index action logic
   * @return {} []
   */
  whiteOrigins = [
    'http://localhost:8080',
    'http://www.paidepaiper.top',
    'http://www.paidepaiper.xyz'
  ]
  async __before(){
    let method = this.http.method.toLowerCase();
    if (this.whiteOrigins.indexOf(this.header("origin")) !== -1) {
      if(method === "options"){
        this.setCorsHeader();
        this.end();
        return;
      }
      this.setCorsHeader();
    }
  }
  setCorsHeader(){
    this.header("Access-Control-Allow-Origin", this.header("origin"));
    this.header("Access-Control-Allow-Headers", "x-requested-with,token,content-type");
    this.header("Access-Control-Request-Method", "GET,POST,PUT,DELETE");
    this.header("Access-Control-Allow-Credentials", "true");
  }
}
