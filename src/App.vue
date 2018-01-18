<template>
  <div>
    <router-view/>
    <loading v-show="loading.flag"></loading>
  </div>
</template>

<script>
  import {mapActions} from 'vuex'
  import loading from '@/components/public/loading.vue'
  export default {
    name: 'app',
    data () {
      return {
        loading: this.$store.state.base.loading
      }
    },
    methods: {
      ...mapActions([
        'ACTION_LOGIN',
        'ACTION_GET_LOAD_DICT_CACHE',
        'ACTION_GET_LOAD_ORG_CACHE'
      ])
    },
    components: {
      loading
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
