/**
* @file
* @author Leo
* @date 2018/01/20
*/
<template>
  <header class="mui-bar mui-bar-nav">
    <a class="mui-action-back mui-icon mui-pull-left iconfont icon-arrow_left" v-show="!titleData.left"></a>
    <h1 class="mui-title" v-text="titleData.title"></h1>
  </header>
</template>
<style lang="less" rel="stylesheet/less">
</style>
<script>
  export default{
    data: function () {
      return {
      }
    },
    props: {
      titleData: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    methods: {
    },
    mounted: function () {
    }
  }
</script>
