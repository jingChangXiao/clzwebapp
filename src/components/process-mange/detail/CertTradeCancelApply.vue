/**
* @file 学员信息变更
* @author Leo
* @date 2017/12/27
*/
<template>
  <div>
    <content-title :titleData="{title: '交易作废'}"></content-title>
    <div class="mui-content">
      <div class="mui-scroll-wrapper _mui-scroll-wrapper" :class="detail.processState ? 'bottom-45' : ''">
        <div class="mui-scroll">
          <div class="detail-content">
            <div class="list-title">基本信息</div>
            <div class="list-base-information-chunk">
              <div class="list-base-information" v-for="item in tableItems">
                <div class="list-item-left" v-text="item.label"></div>
                <div class="list-item-right" v-text="detail.info[item.name]"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">收款日期</div>
                <div class="list-item-right" v-text="formatFn(detail.info.tradeDate)"></div>
              </div>
            </div>
            <div>
              <div class="list-title">商品信息</div>
              <div class="list-base-information-chunk">
                <div class="mui-row mui-row-list table-font-title">
                  <div class="mui-col-sm-4 mui-col-xs-4 table-font">
                    商品名称
                  </div>
                  <div class="mui-col-sm-3 mui-col-xs-3 table-font">
                    单价
                  </div>
                  <div class="mui-col-sm-2 mui-col-xs-2 table-font">
                    数量
                  </div>
                  <div class="mui-col-sm-3 mui-col-xs-3 table-font">
                    总价
                  </div>
                </div>
                <div class="mui-row mui-row-list table-font-content" v-for="item in orderData.data">
                  <div class="mui-col-sm-4 mui-col-xs-4 table-font" v-text="item.goodsName">
                  </div>
                  <div class="mui-col-sm-3 mui-col-xs-3 table-font" v-text="item.goodsCount">
                  </div>
                  <div class="mui-col-sm-2 mui-col-xs-2 table-font" v-text="item.goodsPrice">
                  </div>
                  <div class="mui-col-sm-3 mui-col-xs-3 table-font" v-text="item.goodsCount * item.goodsPrice">
                  </div>
                </div>
              </div>
            </div>
            <div class="list-title">审批记录</div>
            <div class="list-base-information-chunk">
              <process-record-list :list="detail.processList"></process-record-list>
            </div>
          </div>
        </div>
      </div>
    </div>
    <process-action @action="save" v-show="detail.processState"></process-action>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>

</style>
<script>
  import {api} from '@/assets/js/api'
  import {APIS} from '@/assets/js/config'
  import changeContent from '@/components/public/change-content.vue'
  import processAction from '@/components/public/process/action.vue'
  import processRecordList from '@/components/public/process/process-record-list.vue'
  export default{
    data () {
      return {
        getTypeNameData: this.$store.state.base.dictCacheData,
        base: this.$store.state.base,
        detail: {
          info: {},
          processList: [],
          processState: false
        },
        orderData: {
          data: []
        },
        tableItems: [
          {name: 'receiptNo', label: '收据编号'},
          {name: 'posAmount', label: '刷卡金额'},
          {name: 'posRefNo', label: '交易参考号'},
          {name: 'totalAmount', label: '实收金额'},
          {name: 'userName', label: '学员姓名'},
          {name: 'idNum', label: '身份证号'},
          {name: 'mobile', label: '联系电话'},
          {name: 'classType', label: '班别'},
          {name: 'modelCar', label: '车型'},
          {name: 'owedAmount', label: '应收账款'},
          {name: 'orderNo', label: '订单号'},
          {name: 'remark', label: '备注'}
        ]
      }
    },
    components: {
      changeContent,
      processAction,
      processRecordList
    },
    computed: {},
    methods: {
      orgMapName (id) {
        return this.base.loadOrgCache.data.orgMap ? this.base.loadOrgCache.data.orgMap[id] : ''
      },
      save (flag) {
        let self = this
        let btnArray = ['取消', '确定']
        let titleMsg = flag ? '请输入同意审批意见：' : '请输入拒绝审批意见：'
        mui.prompt('', titleMsg, this.$store.state.base.appName, btnArray, e => {
          if (e.index === 1) {
            let param = {
              action: flag,
              message: e.value,
              procInstId: self.$route.params.processInstanceId,
              taskId: self.$route.params.taskId
            }
            let postData = {url: APIS.processCenter.taskComplete, method: 'POST', param}
            api.initAjax(postData).then((rtData) => {
              if (rtData.status) {
                mui.back()
              } else {
                mui.alert(rtData.message)
              }
            }, (rtData) => {
              mui.alert(rtData.message)
            })
          } else {
            console.log('---取消')
          }
        }, 'textArea')
        console.log(flag)
      },
      getTrade (orderId) {
        let infoData = {url: APIS.processCenter.searchGoodsByOrderId, method: 'GET', param: {orderId}}
        api.initAjax(infoData).then((rtData) => {
          if (rtData.status) {
            this.orderData.data = rtData.data
          } else {
            mui.alert(rtData.message)
          }
        }, (rtData) => {
          mui.alert(rtData.message)
        })
      },
      getDetail () {
        if (!this.$route.params.id) {
          mui.alert('无效的访问')
          return
        }
        let infoParam = {id: this.$route.params.id}
        let infoData = {url: APIS.processCenter.certTradeCancellationApply, method: 'GET', param: infoParam}
        api.initAjax(infoData).then((rtData) => {
          if (rtData.status) {
            this.detail.info = rtData.data
            this.getTrade(this.detail.info.orderId)
          } else {
            mui.alert(rtData.message)
          }
        }, (rtData) => {
          mui.alert(rtData.message)
        })

        let listParam = {processInstanceId: this.$route.params.processInstanceId}
        let listData = {url: APIS.processCenter.findApprovelRecord, method: 'GET', param: listParam}
        api.initAjax(listData).then((rtData) => {
          if (rtData.status) {
            this.detail.processList = rtData.data
            this.detail.processList.reverse()
            console.log(this.detail.processList)
          } else {
            mui.alert(rtData.message)
          }
        }, (rtData) => {
          mui.alert(rtData.message)
        })

        let statusData = {url: APIS.processCenter.findTaskByProcessInstanceId, method: 'POST', param: listParam}
        api.initAjax(statusData).then((rtData) => {
          if (rtData.status) {
            this.detail.processState = rtData.data.approvel
          } else {
            mui.alert(rtData.message)
          }
        }, (rtData) => {
          mui.alert(rtData.message)
        })
      }
    },
    mounted () {
      this.getDetail()
    }
  }
</script>
