/**
* @file 门店管理
* @author Leo
* @date 2017/12/19
*/
<template>
  <div>
    <header class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">车辆管理</h1>
      <a class="mui-icon mui-icon-search mui-pull-right" @tap="goSearch"></a>
    </header>
    <div class="mui-content">
      <refresh-scroll-cm top="45px" @pullRefreshReady="pullRefreshReady" @pulldown="pulldown" @pullup="pullup">
        <div>
          <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="(item, index) in list.data" @tap="goDetail(index)">
              <a class="mui-navigate-right" href="javascript:;">
                <div class="mui-media-body">
                  <span v-text="item.plateNumber"></span>
                  <p class='mui-ellipsis' v-text="item.areaName"></p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </refresh-scroll-cm>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<script>
  import refreshScroll from '@/assets/js/refresh-scroll'
  import refreshScrollCm from '@/components/public/scroll-refresh.vue'
  export default{
    data () {
      return {
        list: this.$store.state.workList.carInfoList
      }
    },
    computed: {},
    components: {
      refreshScrollCm
    },
    methods: {
      // 分页刷新列表组件ready事件
      pullRefreshReady (scroll) {
        // 设置列表对应的的滚动对象
        refreshScroll.setListScroll(this.list, scroll)
      },
      // 分页刷新列表组件下拉刷新事件
      pulldown () {
        refreshScroll.listRefresh(this.list)
      },
      // 分页刷新列表组件上拉加载更多事件
      pullup () {
        refreshScroll.listLoadMore(this.list)
      },
      goSearch () {
        this.$router.push('/carManageListSearch')
      },
      goDetail (index) {
        this.$router.push('/carManageDetail/' + this.list.data[index].id)
      }
    },
    mounted: function () {
      this.list.searchObject.p = 1
      refreshScroll.listReq(this.list)
    }
  }
</script>
