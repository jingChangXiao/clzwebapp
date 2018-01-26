/**
* @file 门店管理
* @author Leo
* @date 2017/12/19
*/
<template>
  <div>
    <content-title :titleData="{title: '门店管理'}"></content-title>
    <div class="mui-content">
      <div>
        <div class="mui-row">
          <div class="mui-col-sm-4 mui-col-xs-4 label-div-select" :class="selectFlag === 'selectArea' ? 'active' : ''"
               @tap="selectArea('selectArea')">
            <span class="label-div-select-item">
              <span v-text="list.searchObject.areaIdName || '片区'"></span>
              <span class="mui-icon mui-icon-arrowdown" style="font-size:12px;"></span>
            </span>
          </div>
          <div class="mui-col-sm-4 mui-col-xs-4 label-div-select" :class="selectFlag === 'selectState' ? 'active' : ''"
               @tap="selectState('selectState')">
            <span class="label-div-select-item">
              <span v-text="list.searchObject.statusName || '营业状态'"></span>
              <span class="mui-icon mui-icon-arrowdown" style="font-size:12px;"></span>
            </span>
          </div>
          <div class="mui-col-sm-4 mui-col-xs-4 label-div-select" :class="selectFlag === 'more' ? 'active' : ''"
               @tap="selectMore('more')">
            <span class="label-div-select-item">
              <span>更多查询</span>
            </span>
          </div>
        </div>
      </div>
      <refresh-scroll-cm top="85px" @pullRefreshReady="pullRefreshReady" @pulldown="pulldown" @pullup="pullup">
        <div style="margin: 0px 12px;">
          <div class="content-list-item" v-for="(item, index) in list.data" @tap="goDetail(index)">
            <div class="mui-navigate-right" style="position: relative">
              <span class="mui-media-object mui-pull-left mui-pull-left-flag">
                <img :src="imgSrc" width="100%">
              </span>
              <div class="mui-media-body" style="padding-left: 82px;">
                <span style="display: flex;">
                  <span style="color:#3A444A;font-size:16px;">{{isEmpty(item.name)}}</span>
                </span>
                <div class='mui-ellipsis' style="font-size: 12px;margin-top: 4px;color: #7F7F7F;padding-right:10px;">
                  发顺丰发送范德萨发发顺丰发送范德萨发发顺丰发送范德萨发发顺丰发送范德萨发发顺丰发送范德萨发
                </div>
                <div style="font-size: 14px;color: #FF7323;">
                  {{'电话：' + isEmpty(item.telephone)}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </refresh-scroll-cm>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .mui-navigate-right::after {
    right: -10px;
  }

  .content-list-item {
    margin-top: 12px;
    box-shadow: 0 4px 12px 0 rgba(39, 52, 56, 0.08);
    border-radius: 9.02px;
    padding: 15px 20px 15px 18px;
    background-color: white;
  }

  .mui-pull-left-flag {
    display: inline-block;
    height: 60px;
    width: 60px;
    border-radius: 50%;
  }

  .item-teachingTypeName {
    background-image: linear-gradient(-450deg, #FFAB68 0%, #FF7626 100%);
    box-shadow: 0 4px 8px 0 rgba(255, 118, 38, 0.08);
    font-size: 12px;
    color: white;
    padding: 0px 5px;
    border-radius: 5px;
    margin-left: 15px;
  }

  .item-teachingCarName {
    background-image: linear-gradient(-450deg, #A3A3A3 0%, #515151 100%);
    box-shadow: 0 5px 10px 0 rgba(255, 118, 38, 0.08);
    border-radius: 5px;
    font-size: 12px;
    margin-left: 10px;
    padding: 0px 5px;
    color: white;
  }
</style>
<script>
  import refreshScroll from '@/assets/js/refresh-scroll'
  import refreshScrollCm from '@/components/public/scroll-refresh.vue'
  import contentTitle from '@/components/public/title.vue'
  export default{
    data () {
      return {
        imgSrc: './static/img/default_img.png',
        selectFlag: 'selectArea',
        list: this.$store.state.workList.searchMStoreByCondition
      }
    },
    computed: {},
    components: {
      refreshScrollCm,
      contentTitle
    },
    methods: {
      isEmpty (arg) {
        return (arg === '' || arg === null || arg === undefined) ? '暂无' : arg
      },
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
      goDetail (index) {
        this.$router.push('/storeManageDetail/' + this.list.data[index].id)
      },
      selectArea (flag) {
        this.selectFlag = flag
        let self = this
        let userPicker = new mui.PopPicker()
        userPicker.setData(this.$store.state.base.searchSelectData.area)
        userPicker.show(items => {
          self.list.searchObject.areaIdName = items[0].text
          self.list.searchObject.areaId = items[0].value
          self.list.searchObject.p = 1
          refreshScroll.listReq(this.list)
        })
      },
      selectState (flag) {
        this.selectFlag = flag
        let self = this
        let userPicker = new mui.PopPicker()
        userPicker.setData(this.$store.state.base.searchSelectData.store_operating_status)
        userPicker.show(items => {
          self.list.searchObject.statusName = items[0].text
          self.list.searchObject.status = items[0].value
          self.list.searchObject.p = 1
          refreshScroll.listReq(this.list)
        })
      }
    },
    mounted () {
      this.list.searchObject.p = 1
      refreshScroll.listReq(this.list)
    }
  }
</script>
