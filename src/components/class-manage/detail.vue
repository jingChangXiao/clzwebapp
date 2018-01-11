/**
* @file
* @author Leo
* @date 2017/12/25
*/
<template>
  <div>
    <header id="header" class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">学员管理</h1>
    </header>
    <div class="mui-content">
      <div class="mui-scroll-wrapper _mui-scroll-wrapper">
        <div class="mui-scroll">
          <div>
            <div>
              <div v-text="detail.data.userName"></div>
            </div>
            <div class="list-title">
              基本信息
            </div>
            <div>
              <div class="list-base-information" v-for="item in tableItemsBase">
                <div class="list-item-left" v-text="item.label"></div>
                <div class="list-item-right" v-text="detail.data[item.name]"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">报名时间</div>
                <div class="list-item-right" v-text="formatFn(detail.data.registrationDate)"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">门店</div>
                <div class="list-item-right" v-text="orgMapName(detail.data.storeId)"></div>
              </div>
            </div>

            <div>
              <div class="mui-row">
                <div class="mui-col-sm-4 mui-col-xs-4" style="text-align: center" @tap="changeFlag(0)">
                  办证记录
                </div>
                <div class="mui-col-sm-4 mui-col-xs-4" style="text-align: center" @tap="changeFlag(1)">
                  订单记录
                </div>
                <div class="mui-col-sm-4 mui-col-xs-4" style="text-align: center" @tap="changeFlag(2)">
                  商品及核销记录
                </div>
              </div>
            </div>
            <div>
              <div v-show="showFlag === 0">
                <div class="mui-row">
                  <div class="mui-col-sm-4 mui-col-xs-4">
                    批次号
                  </div>
                  <div class="mui-col-sm-3 mui-col-xs-3">
                    科目
                  </div>
                  <div class="mui-col-sm-2 mui-col-xs-2">
                    状态
                  </div>
                  <div class="mui-col-sm-3 mui-col-xs-3">
                    日期
                  </div>
                </div>
                <div class="mui-row" v-for="item in certStudentAllProjectDetail.data">
                  <div class="mui-col-sm-4 mui-col-xs-4" v-text="item.batchNum">
                  </div>
                  <div class="mui-col-sm-3 mui-col-xs-3" v-text="item.certProjectName">
                  </div>
                  <div class="mui-col-sm-2 mui-col-xs-2" v-text="item.stateDescribe">
                  </div>
                  <div class="mui-col-sm-3 mui-col-xs-3" v-text="formatFn(item.createdAt)">
                  </div>
                </div>
              </div>
              <div v-show="showFlag === 1">
                <div class="mui-row">
                  <div class="mui-col-sm-4 mui-col-xs-4">
                    订单号
                  </div>
                  <div class="mui-col-sm-3 mui-col-xs-3">
                    金额
                  </div>
                  <div class="mui-col-sm-2 mui-col-xs-2">
                    订单状态
                  </div>
                  <div class="mui-col-sm-3 mui-col-xs-3">
                    下单日期
                  </div>
                </div>
                <div class="mui-row" v-for="item in searchMarketOrderList.data">
                  <div class="mui-col-sm-4 mui-col-xs-4" v-text="item.orderNo">
                  </div>
                  <div class="mui-col-sm-3 mui-col-xs-3" v-text="item.orderAmount">
                  </div>
                  <div class="mui-col-sm-2 mui-col-xs-2" v-text="getTypeName('order_status', item.orderStatus)">
                  </div>
                  <div class="mui-col-sm-3 mui-col-xs-3" v-text="formatFn(item.orderTime)">
                  </div>
                </div>
              </div>
              <div v-show="showFlag === 2">
                <div class="mui-row">
                  <div class="mui-col-sm-4 mui-col-xs-4">
                    商品名称
                  </div>
                  <div class="mui-col-sm-3 mui-col-xs-3">
                    单价
                  </div>
                  <div class="mui-col-sm-2 mui-col-xs-2">
                    使用状态
                  </div>
                  <div class="mui-col-sm-3 mui-col-xs-3">
                    使用日期
                  </div>
                </div>
                <div class="mui-row" v-for="item in certServiceDetail.data">
                  <div class="mui-col-sm-4 mui-col-xs-4" v-text="item.goodsName">
                  </div>
                  <div class="mui-col-sm-3 mui-col-xs-3" v-text="item.price">
                  </div>
                  <div class="mui-col-sm-2 mui-col-xs-2" v-text="item.state === '0' ? '待使用' : '已使用'">
                  </div>
                  <div class="mui-col-sm-3 mui-col-xs-3" v-text="formatFn(item.verificationDate)">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang='less' rel='stylesheet.less' scoped>
</style>
<script>
  import {api} from '@/assets/js/api'
  import {APIS} from '@/assets/js/config'
  export default {
    data () {
      return {
        getTypeNameData: this.$store.state.base.dictCacheData,
        base: this.$store.state.base,
        showFlag: 0,
        detail: {
          data: {}
        },
        tableItemsBase: [
          {name: 'idNum', label: '证件号码'},
          {name: 'phone', label: '联系电话'},
          {name: 'modelCar', label: '车型'},
          {name: 'className', label: '班别'},
          {name: 'customerServiceName', label: '客服'},
          {name: 'coachName', label: '教练'},
          {name: 'expensesAmount', label: '待收金额'}
        ],
        searchMarketOrderList: {
          data: []
        },
        certServiceDetail: {
          data: []
        },
        certStudentAllProjectDetail: {
          data: []
        }
      }
    },
    computed: {},
    methods: {
      changeFlag (flag) {
        this.showFlag = flag
      },
      orgMapName (id) {
        return this.base.loadOrgCache.data.orgMap ? this.base.loadOrgCache.data.orgMap[id] : ''
      },
      getTypeName (name, value) {
        if (this.getTypeNameData.data && this.getTypeNameData.data[name]) {
          return this.getTypeNameData.data[name][value]
        } else {
          return ''
        }
      },
      formatFn (val) {
        var date = new Date(val)
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
      },
      getData () {
        let postData = {
          url: APIS.findCertServiceInfoPageList.getServiceInfo,
          method: 'GET',
          param: {id: this.$route.params.id}
        }
        api.initAjax(postData).then((rtData) => {
          if (rtData.status) {
            this.detail.data = rtData.data
            // 订单记录
            let searchMarketOrderList = {
              url: APIS.findCertServiceInfoPageList.searchMarketOrderList,
              method: 'POST',
              param: {userId: rtData.data.userId}
            }
            api.initAjax(searchMarketOrderList).then((rtData) => {
              if (rtData.status) {
                this.searchMarketOrderList.data = rtData.data
                // 订单记录
              } else {
                mui.alert(rtData.message)
              }
            }, (rtData) => {
              mui.alert(rtData.message)
            })
            // 商品及核销记录
            let certServiceDetail = {
              url: APIS.findCertServiceInfoPageList.certServiceDetail,
              method: 'POST',
              param: {serviceId: rtData.data.id}
            }
            api.initAjax(certServiceDetail).then((rtData) => {
              if (rtData.status) {
                this.certServiceDetail.data = rtData.data
              } else {
                mui.alert(rtData.message)
              }
            }, (rtData) => {
              mui.alert(rtData.message)
            })
            // 办证记录
            let certStudentAllProjectDetail = {
              url: APIS.findCertServiceInfoPageList.certStudentAllProjectDetail,
              method: 'POST',
              param: {serviceId: rtData.data.id}
            }
            api.initAjax(certStudentAllProjectDetail).then((rtData) => {
              if (rtData.status) {
                this.certStudentAllProjectDetail.data = rtData.data
              } else {
                mui.alert(rtData.message)
              }
            }, (rtData) => {
              mui.alert(rtData.message)
            })
          } else {
            mui.alert(rtData.message)
          }
        }, (rtData) => {
          mui.alert(rtData.message)
        })
      }
    },
    created: function () {
    },
    mounted: function () {
      this.getData()
    }
  }
</script>
