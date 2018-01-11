/**
* @file 主页内容
* @author Leo
* @date 2017/12/19
*/
<template>
  <div>
    <header class="mui-bar mui-bar-nav">
      <h1 class="mui-title">流程中心</h1>
    </header>
    <div class="mui-content">
      <div class="mui-row">
        <div class="mui-col-sm-4 mui-col-xs-4 label-div"
             v-for="(item, index) in sliderData"
             :class="item.flag === list.searchObject.flag ? 'active' : ''"
             @tap="select(index)">
          <span class="label-div-item" v-text="item.name"></span>
        </div>
      </div>
      <!--<div class="mui-segmented-control mui-segmented-control-inverted _mui-segmented-control-inverted">-->
      <!--<a class="mui-control-item" href="#item1mobile" v-for="(item, index) in sliderData" v-text="item.name"-->
      <!--:class="item.flag === list.searchObject.flag ? 'mui-active' : ''" @tap="select(index)">-->
      <!--</a>-->
      <!--</div>-->
      <refresh-scroll-cm top="86px" bottom="50px" @pullRefreshReady="pullRefreshReady" @pulldown="pulldown"
                         @pullup="pullup">
        <div style="margin: 0px 15px;">
          <div class="content-list-item" style="" v-for="(item, index) in list.data" @tap="goDetail(index)">
            <div class="mui-navigate-right" href="javascript:;">
              <span class="mui-media-object mui-pull-left mui-pull-left-flag"
                    :class="'mui-pull-left-flag' + item.state"></span>
              <div class="mui-media-body" style="padding-left: 58px;">
                <span v-text="item.businessName + '-' + item.applyUserName || '测试title'" style="color:#3A444A;"></span>
                <p class='mui-ellipsis' style="font-size: 12px;margin: 0px;">
                  <span v-text="item.actName || '审批人'"></span>
                  <span v-text="formatFn(item.startTime)" style="float:right;margin-right: 20px;"></span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </refresh-scroll-cm>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .content-list-item {
    margin-top: 10px;
    box-shadow: 0 4px 10px 0 rgba(39, 52, 56, 0.17);
    border-radius: 8px;
    padding: 10px 14px 12px 13px;
  }

  ._mui-segmented-control-inverted {
    border-bottom: 1px solid #e3e3e3;
  }

  .mui-pull-left-flag {
    display: inline-block;
    height: 42px;
    width: 42px;
    border: 1px solid #666;
    border-radius: 50%;
    font-size: 12px;
    text-align: center;
    color: #666;
  }

  .mui-pull-left-flag0 {
    border-color: red;
    color: red;
    content: '处理中';
  }

  .mui-pull-left-flag1 {
    border-color: green;
    color: green;
    content: '已完成';
  }

  .mui-pull-left-flag2 {
    border-color: yellow;
    color: yellow;
    content: '已驳回';
  }

  .mui-pull-left-flag0::before {
    content: '处理中';
  }

  .mui-pull-left-flag1::before {
    content: '已完成';
  }

  .mui-pull-left-flag2::before {
    content: '已驳回';
  }

  .mui-pull-left-flag3::before {
    content: '已取消';
  }
</style>
<script>
  import refreshScroll from '@/assets/js/refresh-scroll'
  import refreshScrollCm from '@/components/public/scroll-refresh.vue'
  export default{
    data () {
      return {
        routeData: {
          CertChStuInfoProcess: true,
          CertChStoreProcess: true,
          CertChCourseProcess: true,
          CertExamAprvProcess: true,
          CertChScoreProcess: true,
          CertDiscountProcess: true,
          CertExpenditureApply: true,
          EduTemporarySubmit: true,
          EduRecoverSubmit: true,
          CarTransferProcess: true,
          CarParkingChange: true,
          ParkingChangeProcess: true,
          CertChCoachProcess: true,
          CertTradeCancelApply: true,
          CertRefundApply: true
        },
        list: this.$store.state.process.processData,
        sliderData: [
          {name: '未审批', flag: '1'},
          {name: '已审批', flag: '2'},
          {name: '我的', flag: '3'}
        ]
      }
    },
    components: {
      refreshScrollCm
    },
    computed: {},
    methods: {
      getInitData () {
        this.list.searchObject.p = 1
        refreshScroll.listReq(this.list)
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
      select (index) {
        this.list.searchObject.flag = this.sliderData[index].flag
        this.getInitData()
      },
      formatFn (val) {
        var date = new Date(val)
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
      },
      goDetail (index) {
        if (this.routeData[this.list.data[index].type]) {
          this.$router.push('/' + this.list.data[index].type + '/' + this.list.data[index].businessKey + '/' + this.list.data[index].procInstId + '/' + this.list.data[index].taskId)
        } else {
          alert('未支持类型')
        }
      }
    },
    created: function () {
    },
    mounted: function () {
      this.getInitData()
    }
  }
</script>
