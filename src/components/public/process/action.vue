/**
* @file
* @author Leo
* @date 2017/03/02
*/
<template>
  <nav class="mui-bar mui-bar-tab _mui-bar-tab">
    <div style="display: flex" class="div-flex">
      <div type="button" class="btn-action" @tap="action(0)">拒绝</div>
      <div type="button" class="btn-action" @tap="action(1)">同意</div>
    </div>
  </nav>
</template>
<style lang="less" rel="stylesheet/less">
  ._mui-bar-tab{
    background-color: #FFFFFF;
    box-shadow: 0 -4px 10px 0 rgba(168,168,168,0.30);
  }
</style>
<script>
  export default{
    data: () => {
      return {}
    },
    methods: {
      action (flag) {
        this.$emit('action', flag)
      }
    }
  }
</script>
