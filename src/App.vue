<template>
    <router-view/>
</template>

<script>
  import {mapActions} from 'vuex'
  export default {
    name: 'app',
    methods: {
      ...mapActions([
        'ACTION_LOGIN',
        'ACTION_GET_LOAD_DICT_CACHE',
        'ACTION_GET_LOAD_ORG_CACHE'
      ])
    },
    mounted () {
//      this.ACTION_GET_LOAD_DICT_CACHE()
//      this.ACTION_GET_LOAD_ORG_CACHE()
    }
  }
</script>

<style lang="less">
  .app-page-root {
    height: 100vh;
    overflow: hidden;
  }

  .app-page-content {
    overflow: auto;
    height: 100%;
    padding-bottom: 56px;
  }

  .app-paper-bottom {
    background: red;
    position: fixed;
    bottom: 0px;
    width: 100%;
  }

  .app-layout-title {
    position: fixed;
    top: 0px;
    width: 100%;
    z-index: 100;
  }

  .app-layout-content {
    position: absolute;
    top: 55px;
    width: 100%;
  }
</style>
