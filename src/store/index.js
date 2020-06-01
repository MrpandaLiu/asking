import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import {
  getStore
} from '../utils'

Vue.use(Vuex)

const state = {
  // 用户信息
  username: getStore('user', 'username') || null, // 用户名
  nickname: null, // 用户昵称
  password: null, // 密码
  profile: null, // 个性签名
  gender: null, // 性别
  coin: null,
  avatar: getStore('user', 'avatar') || null, // 头像
  queCount: null,
  ansCount: null,
  // 问题信息
  HomeList: [], // 首页问题数组
  // 管理员信息
  pageNum: 10, // 每页获取条数
}

export default new Vuex.Store({
  state,
  mutations
})