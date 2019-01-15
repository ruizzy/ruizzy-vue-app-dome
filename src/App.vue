<template>
  <div id="app">
    <x-header :left-options="{backText: '', showBack: showBack, preventGoBack: true}"
              v-show="showNavigationBar" @on-click-back="backPage()">
      <span v-show="title.length">{{ title }}</span>
    </x-header>
    <transition :name="'vux-pop-' + (direction === 'forward' ? 'in' : 'out')">
      <router-view></router-view>
    </transition>
    <transition name="fade">
      <tabbar v-show="tabBarOpt.show">
        <tabbar-item :link="'/home'"
                     selected
                     @on-item-click="selectTabBar('0')">
          <img slot="icon" src= "./assets/img/home-default.png"/>
          <img slot="icon-active" src= "./assets/img/home-selected.png"/>
          <span slot="label">首页</span>
        </tabbar-item>
        <tabbar-item :link="'/user'"
                     @on-item-click="selectTabBar('1')">
          <img slot="icon" src="./assets/img/account-default.png"/>
          <img slot="icon-active" src="./assets/img/account-selected.png"/>
          <span slot="label">我的</span>
        </tabbar-item>
      </tabbar>
    </transition>

    <!-- 以下是公共组件 -->
    <loading v-model="showLoading" text="加载中"></loading>
    <toast v-model="toastOPT.show" type="text" :width="toastOPT.width" :class="{ 'toast-text':toastOPT.type =='text' }">
      <div slot>
        <img v-show="toastOPT.type!='text'" class="g-toast-img" :src="'./static/img/' +toastOPT.type+ '.png'"/>
        <p :class="{ 'g-toast-p':toastOPT.type!='text' }">{{toastOPT.msg}}</p>
      </div>
    </toast>
    <x-dialog v-model="prompt.show" class="g-dialog">
      <h3 class="popue-title">提示</h3>
      <div class="popue-content">
        {{prompt.msg}}
      </div>
      <div class="popue-footer">
        <button class="defaul_btn">确定</button>
        <button v-show="prompt.cancel" class="defaul_btn" @click="prompt.show=false">取消</button>
      </div>
    </x-dialog>
  </div>
</template>

<script>
  import {
    ViewBox,
    Loading,
    Toast,
    Tabbar,
    TabbarItem,
    XDialog,
    XHeader
  } from 'vux'
  export default {
    name: 'app',

    components: {
      ViewBox,
      Loading,
      Toast,
      Tabbar,
      TabbarItem,
      XDialog,
      XHeader
    },

    data () {
      return {
      }
    },

    created () {
        // 手机类型判断
      const _ua = window.navigator.userAgent
      if (_ua.match(/iPhone|iPad/i) != null) {
        this.$store.commit('UPDATE_EQ', {
          eq: 'ios'
        })
      } else if (_ua.match(/Android/i) != null) {
        this.$store.commit('UPDATE_EQ', {
          eq: 'android'
        })
      }
    },

    methods: {
      selectTabBar (index) {
        this.$store.commit('UPDATE_TABBAR_OPT', {
          show: true,
          selected: index
        })
      },
      backPage () {
        // let backPage = this.$store.state.backPage
        // if (backPage) {
        //   this.$router.push({
        //     path: backPage
        //   })
        // } else {
        //   this.$router ? this.$router.back() : window.history.back()
        // }
        window.backPage()
      }
    },

    computed: {
      direction () {
        return this.$store.state.direction
      },
      showBack () {
        return this.$store.state.showBack
      },
      showNavigationBar () {
        return this.$store.state.showNavigationBar
      },
      title () {
        return this.$store.state.navigationTitle
      },
      showLoading () {
        return this.$store.state.showLoading
      },
      toastOPT () {
        return this.$store.state.toastOPT
      },
      tabBarOpt () {
        return this.$store.state.tabBarOpt
      },
      prompt () {
        return this.$store.state.prompt
      }
    }
}
</script>

<style lang="less">
  @import '~vux/src/styles/reset.less';

  #app {

    .vux-header {
      height: 64px;
      background-color: #d42319;

      .vux-header-left {

        height: 20px;
        left: 15px;
        line-height: 20px;
        top: 36px;
        width: 20px;


        .left-arrow::before {
          border-color: white;
        }
      }

      .vux-header-title {
        color: white;
        font-size: 16px;
        height: 20px;
        line-height: 20px;
        position: relative;
        top: 32px;
      }
    }

    .weui-tabbar {
      height: 49px;
      position: fixed;

      .weui-tabbar__item.weui-bar__item_on {

        .weui-tabbar__label {
          color: #d42319;
        }
      }
    }

    .vux-pop-out-enter-active,
    .vux-pop-out-leave-active,
    .vux-pop-in-enter-active,
    .vux-pop-in-leave-active {
      backface-visibility: hidden;
      height: 100%;
      perspective: 1000px;
      position: absolute;
      top: 64px;
      transition: all 250ms;
      width: 100%;
      will-change: transform;
    }

    .vux-pop-out-enter {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }
    .vux-pop-out-leave-active {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
    .vux-pop-in-enter {
      opacity: 0;
      transform: translate3d(100%, 0, 0);
    }
    .vux-pop-in-leave-active {
      opacity: 0;
      transform: translate3d(-100%, 0, 0);
    }

    @media only screen and
    (device-width:375px) and
    (device-height:812px) and
    (-webkit-device-pixel-ratio:3) {
      .vux-header {
        height: 88px;

        .vux-header-left {
          top: 60px;
        }

        .vux-header-title {
          top: 56px;
        }
      }

      .vux-pop-out-enter-active,
      .vux-pop-out-leave-active,
      .vux-pop-in-enter-active,
      .vux-pop-in-leave-active {
        top: 88px;
      }
    }
  }

  .weui-dialog {
    border-radius: 10px;
    height: 124px;
    width: 270px;

    .weui-dialog__hd {
      font-size: 14px;
      font-weight: bold;
      height: 20px;
      line-height: 20px;
      padding: 15px 16px 5px 16px;

    }

    .weui-dialog__bd {
      color: #333333;
      font-size: 12px;
      padding: 0 16px;
      height: 40px;
    }

    .weui-dialog__ft {

      .weui-dialog__btn {
        height: 44px;
      }

      .weui-dialog__btn.weui-dialog__btn_default {
        color: #ff3b30;
        font-size: 15px;
      }

      .weui-dialog__btn.weui-dialog__btn_primary {
        color: #007aff;
        font-size: 15px;
      }
    }
  }

  .vux-popup-dialog {
    font-size: 15px;
  }

  .dp-container {
    font-size: 15px;

    .dp-header {

      .dp-item {
        font-size: 15px;
      }

      .dp-item.vux-datetime-cancel {
        color: #ff3b30;
      }

      .dp-item.vux-datetime-confirm {
        color: #007aff;
      }
    }
  }
</style>
