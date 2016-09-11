// model/user.js

//import Base from "./base";
import mongoose from "mongoose"
let userSchema = new mongoose.Schema({
  username: String,
  password: String,
  nickname: String,
  image: String,
  create_time: Number,
  update_time: Number
}, {
  collection: 'user',
  versionKey: false
})
let userModel = mongoose.model('user', userSchema)
export default class extends think.base {
  findUser(where = {}){
    //let Model = this.getModel();
    return userModel.findOne(where, {
      'username': 1,
      'password': 1,
      'nickname': 1,
      'image': 1
    }).exec();
  }
  addUser(data){
    let newUser = new userModel(data)
    newUser.save()
  }
}
