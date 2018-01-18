/**
* @file 学员信息变更
* @author Leo
* @date 2017/12/27
*/
<template>
  <div>
    <header class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-pull-left iconfont icon-arrow_left"></a>
      <h1 class="mui-title">支出申请</h1>
    </header>
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
                <div class="list-item-left">报名日期</div>
                <div class="list-item-right" v-text="this.formatFn(detail.info.registerDate)"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">学车进度</div>
                <div class="list-item-right" v-text="this.getTypeName('learn_driver_progress', detail.info.learnDriverProgress)"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">付款状态</div>
                <div class="list-item-right" v-text="this.getTypeName('pay_state', detail.info.payState)"></div>
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
  import processAction from '@/components/public/process/action.vue'
  import processRecordList from '@/components/public/process/process-record-list.vue'
  export default{
    data () {
      return {
        getTypeNameData: this.$store.state.base.dictCacheData,
        detail: {
          info: {},
          processList: [],
          processState: false
        },
        tableItems: [
          {name: 'remark', label: '备注'},
          {name: 'userName', label: '学员姓名'},
          {name: 'idNum', label: '证件号码'},
          {name: 'mobile', label: '联系电话'},
          {name: 'classType', label: '班别'},
          {name: 'modelCar', label: '车型'},
          {name: 'owedAmount', label: '应收账款'},
          {name: 'orderNo', label: '订单号'},
          {name: 'goodsName', label: '支出商品'},
          {name: 'payAmount', label: '支出金额'},
          {name: 'bankCard', label: '收款账号'},
          {name: 'bank', label: '发卡银行'},
          {name: 'accountHolder', label: '持卡人'}
        ]
      }
    },
    components: {
      processAction,
      processRecordList
    },
    computed: {
    },
    methods: {
      getTypeName (name, value) {
        if (this.getTypeNameData.data && this.getTypeNameData.data[name]) {
          return this.getTypeNameData.data[name][value]
        } else {
          return ''
        }
      },
      save (flag) {
        let self = this
        let btnArray = ['取消', '确定']
        let titleMsg = flag ? '请输入同意审批意见：' : '请输入拒绝审批意见：'
        mui.prompt('', titleMsg, this.$store.state.base.appName, btnArray, e => {
          console.log(e)
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
      formatFn (val) {
        var date = new Date(val)
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
      },
      getDetail () {
        if (!this.$route.params.id) {
          mui.alert('无效的访问')
          return
        }
        let infoParam = {id: this.$route.params.id}
        let infoData = {url: APIS.processCenter.certStudentExpenditureApply, method: 'GET', param: infoParam}
        api.initAjax(infoData).then((rtData) => {
          if (rtData.status) {
            this.detail.info = rtData.data
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
    mounted: function () {
      this.getDetail()
      console.log(this.getTypeNameData)
    }
  }
</script>
