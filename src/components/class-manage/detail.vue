/**
* @file
* @author Leo
* @date 2017/12/25
*/
<template>
  <div>
    <content-title :titleData="{title: '学员管理'}"></content-title>
    <div class="mui-content">
      <div class="mui-scroll-wrapper _mui-scroll-wrapper">
        <div class="mui-scroll">
          <div class="detail-content">
            <div class="list-base-information-chunk">
              <div class="base-top-user" style="position: relative">
                <span class="mui-media-object mui-pull-left mui-pull-left-flag">
                  <img :src="imgSrc" width="100%">
                </span>
                <div class="mui-media-body" style="padding-left: 60px;">
                <span style="display: flex;">
                  <span style="color:#3A444A;font-size:16px;" v-text="detail.data.className"></span>
                  <span class="item-teachingTypeName" v-text="getTypeName('learn_driver_progress', detail.data.learnDriverProgress)"></span>
                  <span class="item-teachingCarName" v-text="detail.data.modelCar"></span>
                </span>
                  <div class='mui-ellipsis' style="font-size: 12px;margin-top: 8px;color: #7F7F7F;">
                    <div>
                      电话：<span v-text="detail.data.phone"></span>
                    </div>
                  </div>
                </div>
              </div>

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

            <div class="list-base-information-chunk">
              <div class="mui-row">
                <div class="mui-col-sm-4 mui-col-xs-4 label-div" :class="showFlag === 0 ? 'active' : ''" style="text-align: center" @tap="changeFlag(0)">
                  <span class="label-div-item">办证记录</span>

                </div>
                <div class="mui-col-sm-4 mui-col-xs-4 label-div" :class="showFlag === 1 ? 'active' : ''" style="text-align: center" @tap="changeFlag(1)">
                  <span class="label-div-item">订单记录</span>

                </div>
                <div class="mui-col-sm-4 mui-col-xs-4 label-div" :class="showFlag === 2 ? 'active' : ''" style="text-align: center" @tap="changeFlag(2)">
                  <span class="label-div-item">核销记录</span>

                </div>
              </div>
              <div>
                <div v-show="showFlag === 0">
                  <div class="mui-row mui-row-list table-font-title">
                    <div class="mui-col-sm-4 mui-col-xs-4 table-font">
                      批次号
                    </div>
                    <div class="mui-col-sm-3 mui-col-xs-3 table-font">
                      科目
                    </div>
                    <div class="mui-col-sm-2 mui-col-xs-2 table-font">
                      状态
                    </div>
                    <div class="mui-col-sm-3 mui-col-xs-3 table-font">
                      日期
                    </div>
                  </div>
                  <div class="mui-row mui-row-list table-font-content" v-for="item in certStudentAllProjectDetail.data">
                    <div class="mui-col-sm-4 mui-col-xs-4 table-font" v-text="item.batchNum">
                    </div>
                    <div class="mui-col-sm-3 mui-col-xs-3 table-font" v-text="item.certProjectName">
                    </div>
                    <div class="mui-col-sm-2 mui-col-xs-2 table-font" v-text="item.stateDescribe">
                    </div>
                    <div class="mui-col-sm-3 mui-col-xs-3 table-font" v-text="formatFn(item.createdAt)">
                    </div>
                  </div>
                </div>
                <div v-show="showFlag === 1">
                  <div class="mui-row mui-row-list table-font-title">
                    <div class="mui-col-sm-4 mui-col-xs-4 table-font">
                      订单号
                    </div>
                    <div class="mui-col-sm-3 mui-col-xs-3 table-font">
                      金额
                    </div>
                    <div class="mui-col-sm-2 mui-col-xs-2 table-font">
                      状态
                    </div>
                    <div class="mui-col-sm-3 mui-col-xs-3 table-font">
                      下单日期
                    </div>
                  </div>
                  <div class="mui-row mui-row-list table-font-content" v-for="item in searchMarketOrderList.data">
                    <div class="mui-col-sm-4 mui-col-xs-4 table-font" v-text="item.orderNo">
                    </div>
                    <div class="mui-col-sm-3 mui-col-xs-3 table-font" v-text="item.orderAmount">
                    </div>
                    <div class="mui-col-sm-2 mui-col-xs-2 table-font" v-text="getTypeName('order_status', item.orderStatus)">
                    </div>
                    <div class="mui-col-sm-3 mui-col-xs-3 table-font" v-text="formatFn(item.orderTime)">
                    </div>
                  </div>
                </div>
                <div v-show="showFlag === 2">
                  <div class="mui-row mui-row-list table-font-title">
                    <div class="mui-col-sm-4 mui-col-xs-4 table-font">
                      商品名称
                    </div>
                    <div class="mui-col-sm-3 mui-col-xs-3 table-font">
                      单价
                    </div>
                    <div class="mui-col-sm-2 mui-col-xs-2 table-font">
                      状态
                    </div>
                    <div class="mui-col-sm-3 mui-col-xs-3 table-font">
                      使用日期
                    </div>
                  </div>
                  <div class="mui-row mui-row-list table-font-content" v-for="item in certServiceDetail.data">
                    <div class="mui-col-sm-4 mui-col-xs-4 table-font" v-text="item.goodsName">
                    </div>
                    <div class="mui-col-sm-3 mui-col-xs-3 table-font" v-text="item.price">
                    </div>
                    <div class="mui-col-sm-2 mui-col-xs-2 table-font" v-text="item.state === '0' ? '待使用' : '已使用'">
                    </div>
                    <div class="mui-col-sm-3 mui-col-xs-3 table-font" v-text="formatFn(item.verificationDate)">
                    </div>
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

  .base-top-user {
    padding: 10px;
    border-bottom: 1px dashed #eee;
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
    height: 40px;
    width: 40px;
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
  import {api} from '@/assets/js/api'
  import {APIS} from '@/assets/js/config'
  export default {
    data () {
      return {
        imgSrc: './static/img/user_img_m.png',
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
    created () {
    },
    mounted () {
      this.getData()
    }
  }
</script>
