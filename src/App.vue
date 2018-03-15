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
  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: url(https://fonts.gstatic.com/s/materialicons/v36/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.woff2) format('woff2');
  }
  .material-icons {
    font-family: 'Material Icons';
    font-weight: normal;
    font-style: normal;
    font-size: 24px;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
  }
  @import "../static/css/index.css";
  /*@import "../static/fonts/iconfont.css";*/
  .app-page-root {
    height: 100vh;
    overflow: hidden;
  }
</style>
