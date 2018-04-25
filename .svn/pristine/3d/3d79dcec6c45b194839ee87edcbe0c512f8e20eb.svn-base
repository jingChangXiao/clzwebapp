<template>
  <li class="funcItem">
    <router-link  tag='span' class='link' v-if='data.path' :to='data.path'>
      <span>{{data.name}}</span>
      <i class="iconfont icon-arrow_right" v-if='data.click'></i>
    </router-link>
    <span v-else-if='data.events' class="link" @click='data.events'>
      <span>{{data.name}}</span>
      <i class="iconfont icon-arrow_right" ></i>
    </span>
    <span v-else class="link">
      <span>{{data.name}}</span>
      <i class="iconfont icon-arrow_right" ></i>
    </span>
  </li>
</template>

<script>
  export default {
    name: 'funcItem',
    props: {
      data: {
        type: Object,
        default () {
          return {}
        }
      }
    }
  }
</script>

<style scoped lang="less">
@import '../../../static/css/mixin';
.funcItem{
  padding: 0.18rem 0.2rem;
  .link{
    display: block;
    .flex;
    .flex-pack-justify;
    .flex-align-center;
    span{
      font-size: 0.17rem;
      color: #333;
    }
  }
}
</style>