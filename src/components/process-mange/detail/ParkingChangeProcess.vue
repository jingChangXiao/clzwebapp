/**
* @file 恢复学车
* @author Leo
* @date 2017/12/27
*/
<template>
  <div>
    <content-title :titleData="{title: applyTypeName}"></content-title>
    <div class="mui-content">
      <div class="mui-scroll-wrapper _mui-scroll-wrapper" :class="detail.processState ? 'bottom-45' : ''">
        <div class="mui-scroll">
          <div class="mui-scroll-body detail-content">
            <div class="list-title">基本信息</div>
            <div class="list-base-information-chunk">
              <div class="list-base-information" v-for="item in tableItems">
                <div class="list-item-left" v-text="item.label"></div>
                <div class="list-item-right" v-text="detail.info[item.name]"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">缴费模式</div>
                <div class="list-item-right" v-text="getTypeName('payment_type', detail.info.paymentModel)"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">保安</div>
                <div class="list-item-right" v-text="detail.info.security ? '无' : '有'"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">停车模式</div>
                <div class="list-item-right" v-text="detail.info.parkingMode ? '白天' : '夜间'"></div>
              </div>
              <div class="list-base-information" v-show="detail.info.applyType === 2">
                <div class="list-item-left">接收停车点</div>
                <div class="list-item-right" v-text="detail.info.receivingParkingName || '无'"></div>
              </div>

              <div class="list-base-information">
                <div class="list-item-left" v-text="detail.info.applyType === 1 ? '变更原因' : '备注'"></div>
                <div class="list-item-right" v-text="detail.info.remark"></div>
              </div>
            </div>
            <div v-show="detail.info.applyType === 1">
              <div class="list-title">变更内容</div>
              <change-content :list="changeList"></change-content>
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
        detail: {
          info: {},
          processList: [],
          processState: false
        },
        tableItems: [
          {name: 'parkingName', label: '车点名称'},
          {name: 'areaName', label: '所属片区'},
          {name: 'parkingMoney', label: '停车费'}
        ]
      }
    },
    components: {
      changeContent,
      processAction,
      processRecordList
    },
    computed: {
      applyTypeName () {
        let name = '停车点变更'
        if (this.detail.info.applyType === 0) {
          name = '新增停车点'
        } else if (this.detail.info.applyType === 1) {
          name = '变更停车点'
        } else if (this.detail.info.applyType === 2) {
          name = '停用停车点'
        }
        return name
      },
      changeList () {
        let rtList = []
        rtList.push({name: '缴费模式', oldContent: this.getTypeName('payment_type', this.detail.info.paymentModel), newContent: this.getTypeName('payment_type', this.detail.info.paymentModelChange)})
        rtList.push({name: '停车费用', oldContent: this.detail.info.parkingMoney, newContent: this.detail.info.parkingMoneyChange})
        rtList.push({name: '保安', oldContent: this.detail.info.security ? '无' : '有', newContent: this.detail.info.securityChange ? '无' : '有'})
        rtList.push({name: '停车模式', oldContent: this.detail.info.parkingMode ? '白天' : '夜间', newContent: this.detail.info.parkingModeChange ? '白天' : '夜间'})
        return rtList
      }
    },
    methods: {
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
          }
        }, 'textArea')
      },
      getDetail () {
        if (!this.$route.params.id) {
          mui.alert('无效的访问')
          return
        }
        let infoParam = {id: this.$route.params.id}
        let infoData = {url: APIS.processCenter.parkingChange, method: 'GET', param: infoParam}
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
    }
  }
</script>
