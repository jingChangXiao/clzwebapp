<template>
  <div>
    <router-view/>
    <loading v-show="$store.state.base.loading.flag"></loading>
  </div>
</template>

<script>
  import loading from '@/components/public/loading.vue'
  export default {
    name: 'app',
    data () {
      return {
      }
    },
    methods: {},
    components: {
      loading
    },
    mounted () {
      this.$store.commit('setHeaders', {
        token: 'auidotf784qfgtfgasgdfjsd'
      })
      this._http.login({}).then(() => {}, () => {
        console.log('error')
      })
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
