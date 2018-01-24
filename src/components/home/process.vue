/**
* @file 主页内容
* @author Leo
* @date 2017/12/19
*/
<template>
  <div>
    <content-title :titleData="{title: '流程中心', left: true}"></content-title>
    <div class="mui-content">
      <div class="mui-row">
        <div class="mui-col-sm-4 mui-col-xs-4 label-div"
             v-for="(item, index) in sliderData"
             :class="item.flag === list.searchObject.flag ? 'active' : ''"
             @tap="select(index)">
          <span class="label-div-item" v-text="item.name"></span>
        </div>
      </div>
      <refresh-scroll-cm top="86px" bottom="50px" @pullRefreshReady="pullRefreshReady" @pulldown="pulldown"
                         @pullup="pullup">
        <div style="margin: 0px 12px;">
          <div class="content-list-item" v-for="(item, index) in list.data" @tap="goDetail(index)">
            <span class="list-left-flag">
            </span>
            <div class="mui-navigate-right" style="position: relative">
              <div class="mui-media-body" style="padding-left: 7px;">
                <span style="display: flex;justify-content:space-between;">
                  <span style="color:#3A444A;font-size:16px;"
                        v-text="item.businessName + '-' + item.applyUserName || '测试title'"></span>
                  <span :class="'item-teachingTypeName' + item.state" v-text="getTypeName('approval_state', item.state)"
                        style="float:right;margin-right:10px;min-width:48px;text-align: center;height:20px;"></span>
                </span>
                <div class='mui-ellipsis' style="font-size: 12px;margin-top: 8px;color: #7F7F7F;">
                  <div>
                    <span class="iconfont icon-user" style="font-size: 12px;"></span>
                    <span v-text="item.actName || '审批人'"></span>
                    <span v-text="formatFn(item.startTime, 'yyyy/MM/dd hh:mm')" style="margin-left: 20px;"></span>
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
  .list-left-flag {
    background-image: linear-gradient(-221deg, #FF8F2B 0%, #FF7C25 100%);
    display: inline-block;
    height: 100%;
    width: 7px;
    position:absolute;
    left:0px;
    top:0px;
    border-radius: 9px 0px 0px 9px;
  }

  .mui-navigate-right::after {
    right: -10px;
  }

  .content-list-item {
    position: relative;
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
  .item-teachingTypeName0 {
    background-image: linear-gradient(-450deg, #FFAB68 0%, #FF7626 100%);
    box-shadow: 0 4px 8px 0 rgba(255, 118, 38, 0.08);
    font-size: 12px;
    color: white;
    padding: 0px 5px;
    border-radius: 5px;
    margin-left: 15px;
  }
  .item-teachingTypeName1 {
    background-image: linear-gradient(-450deg, #86CE78 0%, #86CE78 100%);
    box-shadow: 0 4px 8px 0 rgba(255, 118, 38, 0.08);
    font-size: 12px;
    color: white;
    padding: 0px 5px;
    border-radius: 5px;
    margin-left: 15px;
  }
  .item-teachingTypeName2 {
    background-image: linear-gradient(-450deg, #F7776A 0%, #EC2D1A 100%);
    box-shadow: 0 4px 8px 0 rgba(255, 118, 38, 0.08);
    font-size: 12px;
    color: white;
    padding: 0px 5px;
    border-radius: 5px;
    margin-left: 15px;
  }
  .item-teachingTypeName3 {
    background-image: linear-gradient(-450deg, #C5C5C5 0%, #686868 100%);
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
        getTypeNameData: this.$store.state.base.dictCacheData,
        sliderData: [
          {name: '未审批', flag: '1'},
          {name: '已审批', flag: '2'},
          {name: '我的流程', flag: '3'}
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
      goDetail (index) {
        if (this.routeData[this.list.data[index].type]) {
          this.$router.push('/' + this.list.data[index].type + '/' + this.list.data[index].businessKey + '/' + this.list.data[index].procInstId + '/' + this.list.data[index].taskId)
        } else {
          mui.alert('未支持的审批类型')
        }
      }
    },
    created () {
    },
    mounted () {
      this.getInitData()
    }
  }
</script>
