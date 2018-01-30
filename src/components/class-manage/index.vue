/**
* @file 门店管理
* @author Leo
* @date 2017/12/19
*/
<template>
  <div>
    <content-title :titleData="{title: '学员管理'}"></content-title>
    <div class="mui-content">
      <div>
        <div class="mui-row">
          <div class="mui-col-sm-4 mui-col-xs-4 label-div-select" :class="selectFlag === 'selectArea' ? 'active' : ''"
               @tap="selectArea('selectArea')">
            <span class="label-div-select-item">
              <span v-text="list.searchObject.learnDriverProgressName || '学车进度'"></span>
              <span class="mui-icon mui-icon-arrowdown" style="font-size:12px;"></span>
            </span>
          </div>
          <div class="mui-col-sm-4 mui-col-xs-4 label-div-select" :class="selectFlag === 'selectState' ? 'active' : ''"
               @tap="selectState('selectState')">
            <span class="label-div-select-item">
              <span v-text="list.searchObject.storeIdName || '门店'"></span>
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
              <div class="mui-media-body" style="padding-left: 0px;">
                <span style="display: flex;">
                  <span style="color:#3A444A;font-size:16px;" v-text="item.userName"></span>
                  <span class="item-teachingTypeName" v-text="getTypeName('learn_driver_progress', item.learnDriverProgress)"></span>
                  <span class="item-teachingCarName" v-text="item.modelCar"></span>
                </span>
                <div class='mui-ellipsis' style="font-size: 12px;margin-top: 8px;color: #7F7F7F;">
                  <div class="mui-row">
                    <div class="mui-col-sm-7 mui-col-xs-7">
                      <div>
                        受理编号：<span v-text="item.acceptNum"></span>
                      </div>
                      <div>
                        所在片区：<span v-text="getMapName(item.areaId)"></span>
                      </div>
                    </div>
                    <div class="mui-col-sm-5 mui-col-xs-5">
                      <div>
                        客服：<span v-text="item.customerServiceName"></span>
                      </div>
                      <div>
                        教练：<span v-text="item.coachName"></span>
                      </div>
                    </div>
                  </div>
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
    box-shadow: 0 4px 12px 0 rgba(39,52,56,0.08);
    border-radius: 9.02px;
    padding: 15px 20px 15px 18px;
    background-color:white;
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
  import * as types from '@/store/mutation-types'
  export default{
    data () {
      return {
        imgSrc: './static/img/user_img_m.png',
        selectFlag: 'selectArea',
        list: this.$store.state.workList.classList,
        getTypeNameData: this.$store.state.base.dictCacheData,
        loadOrgCache: this.$store.state.base.loadOrgCache
      }
    },
    computed: {
      getStoreMap () {
        if (this.$store.state.base.loadOrgCache.data.areaStoreMap[this.$store.state.userInfo.userInfo.data.areaId]) {
          return [{text: '全部', value: ''}, ...this.$store.state.base.loadOrgCache.data.areaStoreMap[this.$store.state.userInfo.userInfo.data.areaId].map(
            item => ({text: item.storeName, value: item.storeId})
          )]
        }
      }
    },
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
        this.$router.push('./carManageListSearch')
      },
      goDetail (index) {
        this.$router.push('/classManageDetail/' + this.list.data[index].id)
      },
      actionAjaxCacheSelect () {
        this.$store.dispatch(
          types.ACTION_AJAX_CACHE_SELECT,
          ['getCarTypeListMes']
        )
      },
      selectArea (flag) {
        this.selectFlag = flag
        let self = this
        let userPicker = new mui.PopPicker()
        userPicker.setData(this.$store.state.base.searchSelectData.learn_driver_progress)
        userPicker.show(items => {
          self.list.searchObject.learnDriverProgressName = items[0].text
          self.list.searchObject.learnDriverProgress = items[0].value
          self.list.searchObject.p = 1
          refreshScroll.listReq(this.list)
        })
      },
      selectState (flag) {
        this.selectFlag = flag
        let self = this
        let userPicker = new mui.PopPicker()
        userPicker.setData(this.getStoreMap)
        userPicker.show(items => {
          self.list.searchObject.storeIdName = items[0].text
          self.list.searchObject.storeId = items[0].value
          self.list.searchObject.p = 1
          refreshScroll.listReq(this.list)
        })
      },
      getMapName (value) {
        if (this.loadOrgCache.data.orgMap) {
          return this.loadOrgCache.data.orgMap[value]
        } else {
          return ''
        }
      }
    },
    mounted () {
      this.list.searchObject.p = 1
      refreshScroll.listReq(this.list)
      this.actionAjaxCacheSelect()
    }
  }
</script>
