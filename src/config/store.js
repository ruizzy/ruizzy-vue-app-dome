import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
/**
 * @Param direction 转场方向
 * @Param navigationTitle 导航标题
 * @Param showLoading 遮罩层
 * @Param isBack 控制是否跳出应用
 * @Param eq 硬件平台 [ios, android]
 * @Param toastOPT 弹出框配置
 * @Param barOPT tabbar配置
 * @Param backPage 返回页面
 */
const state = {
    direction: 'forward',
    navigationTitle: '',
    showBack: false,
    showNavigationBar: true,
    showLoading: false,
    eq: 'ios',
    backPage: '', //返回点
    toastOPT: {
        show: false,
        type: 'success',
        width: '',
        msg: ''
    },
    tabBarOpt: {
        show: true,
        selected: '0'
      },
    prompt: {
        show: false,
        msg: '',
        callback: null,
        cancel: false
      },
    appVersion: 'Test version'
  }
const mutations = {
      UPDATE_DIRECTION (state, obj) {
        state.direction = obj.direction
      },
      UPDATE_NAVIGATION_TITLE (state, obj) {
        state.navigationTitle = obj.navigationTitle
      },
      UPDATE_SHOW_BACK (state, obj) {
        state.showBack = obj.showBack
      },
      UPDATE_SHOW_NAVIGATIONBAR (state, obj) {
        state.showNavigationBar = obj.showNavigationBar
      },
      UPDATE_SHOW_LOADING (state, obj) {
        state.showLoading = obj.showLoading
      },
      UPDATE_TOAST (state, obj) {
        state.toastOPT = {
          show: obj.show || true,
          type: obj.type || 'success',
          width: obj.width || '',
          msg: obj.msg || ''
        }
      },
      UPDATE_EQ (state, obj) {
        state.eq = obj.eq
      },
      UPDATE_TABBAR_OPT (state, obj) {
        state.tabBarOpt = {
          show: obj.show,
          selected: obj.selected
        }
      },
      UPDATE_PROMPT (state, obj) {
        state.prompt = {
          show: obj.show === undefined ? true : obj.show,
          msg: obj.msg,
          callback: obj.callback === undefined ? null : obj.callback,
          cancel: !!obj.cancel
        }
      },
      UPDATE_BACKPAGE (state, obj) {
        state.backPage = obj.backPage
      },
      UPDATE_FIXEDPOINT (state, obj) {
        state.fixedPoint = obj.fixedPoint
      },
      UPDATE_APP_VERSION (state, obj) {
        state.appVersion = obj.version
      },
      BACK_PAGE_BEFORE (state, obj) {
        state.backPageBefore = obj.backPageBefore
      }
}
const store = new Vuex.Store({
    state,
    mutations
  })

  export default store