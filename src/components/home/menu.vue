/**
* @file 主页底部布局
* @author Leo
* @date 2017/12/19
*/
<template>
  <div>
    <nav class="mui-bar mui-bar-tab mui-bar-tab-bottom" id="bottom-bar">
      <a v-for="(item, index) in navBars" @tap="handleChange(item.route)"  class="mui-tab-item" :class="storeMenuInfo.selectHomeMenu === item.route ? 'mui-active' : ''" >
        <span class="mui-icon iconfont" :class="storeMenuInfo.selectHomeMenu === item.route ? item.iconActive : item.icon"></span>
        <span class="mui-tab-label" v-text="item.title" ></span>
      </a>
    </nav>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .mui-bar-tab .mui-tab-item.mui-active .iconfont::before{
    background-image: -webkit-gradient(linear, 0 0, 0 bottom, from(#FF7626), to(#ffAB68));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .mui-bar-tab-bottom {
    box-shadow: 0 0 5px rgba(0, 0, 0, .15)
  }
</style>
<script>
  import * as types from '@/store/mutation-types'
  export default{
    data () {
      return {
        storeMenuInfo: this.$store.state.base.menu,
        selected: '',
        keyword: '',
        navBars: [
          {title: '消息', route: '/home/message', icon: 'icon-message', iconActive: 'icon-message_f'},
          {title: '工作台', route: '/home/work', icon: 'icon-grid', iconActive: 'icon-grid_f'},
          {title: '流程', route: '/home/process', icon: 'icon-flow', iconActive: 'icon-flow'},
          {title: '我的', route: '/home/user', icon: 'icon-user', iconActive: 'icon-user_f'}
        ]
      }
    },
    computed: {
    },
    methods: {
      handleChange (val) {
        this.$store.commit(types.SET_HOME_MENU_FLAG, val)
        this.$router.push(val)
      }
    },
    mounted () {
      console.log(this.$store.state.base.menu)
    }
  }
</script>
