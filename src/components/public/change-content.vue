/**
* @file
* @author Leo
* @date 2017/03/02
*/
<template>
  <div class="list-base-information-chunk">
    <div class="change-flex mui-row-list table-font-title">
      <div class="change-flex-item table-font">变更名称</div>
      <div class="change-flex-item table-font">变更前</div>
      <div class="change-flex-item table-font">变更后</div>
    </div>
    <div class="change-flex mui-row-list table-font-content" v-for="item in list">
      <div class="change-flex-item table-font" v-text="item.name"></div>
      <div class="change-flex-item table-font" v-text="item.oldContent"></div>
      <div class="change-flex-item table-font" v-text="item.newContent"></div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  .change-flex{
    display: flex;
    .change-flex-item{
      width: 33.3%;
    }
  }
</style>
<script>
  export default{
    data: function () {
      return {
        scroll: {},
        nodata: false
      }
    },
    props: {
      list: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    methods: {

    },
    mounted: function () {
    }
  }
</script>
