/**
* @file 门店管理
* @author Leo
* @date 2017/12/19
*/
<template>
  <div>
    <header class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">班别管理</h1>
      <a class="mui-icon mui-icon-search mui-pull-right" @tap="goSearch"></a>
    </header>
    <div class="mui-content">
      <div>
        <div class="mui-row">
          <div class="mui-col-sm-4 mui-col-xs-4 label-div-select" :class="selectFlag === 'selectArea' ? 'active' : ''"
               @tap="selectArea('selectArea')">
            <span class="label-div-select-item">
              <span>车型</span>
              <span class="mui-icon mui-icon-arrowdown" style="font-size:12px;"></span>
            </span>
          </div>
          <div class="mui-col-sm-4 mui-col-xs-4 label-div-select" :class="selectFlag === 'selectState' ? 'active' : ''"
               @tap="selectState('selectState')">
            <span class="label-div-select-item">
              <span>学车形式</span>
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
              <div class="mui-media-body">
                <div class="mui-row">
                  <div class="mui-col-sm-8 mui-col-xs-8">
                    <span style="display: flex;">
                      <span style="color:#3A444A;font-size:16px;" v-text="item.name"></span>
                    </span>
                    <div style="font-size: 12px;margin-top: 8px;color: #7F7F7F;">
                      <div>
                        <span v-text="item.driveTypeName"></span><span v-text="getTypeName('market_class_study_type', item.studyType)" style="margin-left:20px;"></span>
                      </div>
                    </div>
                  </div>
                  <div class="mui-col-sm-4 mui-col-xs-4">
                    <div v-text="'¥ ' + item.classPrice" style="color:#FF7323;font-size:18px;line-height:50px;text-align: right;padding-right:20px;"></div>
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
  export default{
    data () {
      return {
        selectFlag: 'selectArea',
        getTypeNameData: this.$store.state.base.dictCacheData,
        list: this.$store.state.workList.searchClassList
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
        this.$router.push('/searchClassManageDetail/' + this.list.data[index].id)
      },
      getTypeName (name, value) {
        if (this.getTypeNameData.data && this.getTypeNameData.data[name]) {
          return this.getTypeNameData.data[name][value]
        } else {
          return ''
        }
      }
    },
    mounted: function () {
      this.list.searchObject.p = 1
      refreshScroll.listReq(this.list)
    }
  }
</script>
