/**
* @file 学员信息变更
* @author Leo
* @date 2017/12/27
*/
<template>
  <div>
    <header class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">退费申请</h1>
    </header>
    <div class="mui-content">
      <div class="mui-scroll-wrapper _mui-scroll-wrapper" :class="detail.processState ? 'bottom-45' : ''">
        <div class="mui-scroll">
          <div>
            <div class="list-title">基本信息</div>
            <div>
              <div class="list-base-information" v-for="item in tableItems">
                <div class="list-item-left" v-text="item.label"></div>
                <div class="list-item-right" v-text="detail.info[item.name]"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">学车进度</div>
                <div class="list-item-right" v-text="getTypeName('learn_driver_progress', detail.info.learnDriverProgress)"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">报名日期</div>
                <div class="list-item-right" v-text="formatFn(detail.info.registerDate)"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">扣费项目</div>
                <div class="list-item-right" v-text="detail.info.isDeduction ? '有' : '无'"></div>
              </div>
            </div>
            <div v-show="detail.info.isDeduction">
              <div class="list-title">服务状态</div>
              <div>
                <div class="list-base-information" v-for="item in tableItemsService">
                  <div class="list-item-left" v-text="item.label"></div>
                  <div class="list-item-right" v-text="detail.info[item.name]"></div>
                </div>
              </div>
              <div class="list-title">扣费明细</div>
              <div>
                <div class="list-base-information" v-for="item in tableItemsDetail">
                  <div class="list-item-left" v-text="item.label"></div>
                  <div class="list-item-right" v-text="detail.info[item.name]"></div>
                </div>
              </div>
            </div>
            <div class="list-title">审批记录</div>
            <div>
              <div class="list">
                <div class="listItem listItem-first highlight"
                     v-for="item in detail.processList">
                  <template v-if="item.action !== null">
                    <div class="listItemContent">
                      <div class="listItemContent-date">
                        <span v-text="item.action === '1' ? '同意' : '拒绝'"></span>
                        <span v-text="item.assigneeName"></span>
                        <span v-text="formatFn(item.endTime)" style="float:right;"></span>
                      </div>
                      <div class="listItemContent-content" v-text="item.message || '暂无意见'"></div>
                    </div>
                  </template>
                  <template v-if="item.action === null">
                    <div class="listItemContent">
                      <div class="listItemContent-date">
                        <span v-text="'待审核'"></span>
                        <span v-text="item.assigneeName"></span>
                      </div>
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav class="mui-bar mui-bar-tab" v-show="detail.processState">
      <div style="display: flex" class="div-flex">
        <button type="button" class="mui-btn mui-btn-primary btn-action" @tap="save(1)">同意</button>
        <button type="button" class="mui-btn mui-btn-danger btn-action" @tap="save(0)">拒绝</button>
      </div>
    </nav>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>

</style>
<script>
  import {api} from '@/assets/js/api'
  import {APIS} from '@/assets/js/config'
  import changeContent from '@/components/public/change-content.vue'
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
        tableItemsDetail: [
          {name: 'registrationFee', label: '注册费'},
          {name: 'materialsFee', label: '资料费'},
          {name: 'resitFee', label: '补考费'},
          {name: 'missingFee', label: '缺考费'},
          {name: 'transportationFee', label: '接送费'},
          {name: 'schoolFee', label: '学时费'},
          {name: 'serviceFee', label: '服务费'},
          {name: 'giftFee', label: '礼品扣款'},
          {name: 'otherFee', label: '其他'},
          {name: 'totalDeduction', label: '合计'}
        ],
        tableItemsService: [
          {name: 'twoSubjectHour', label: '科目二学时'},
          {name: 'threeSubjectHour', label: '科目三学时'},
          {name: 'simulationHour', label: '模拟机学时'},
          {name: 'otherService', label: '其他服务'}
        ],
        tableItems: [
          {name: 'idNum', label: '证件号码'},
          {name: 'userName', label: '客户姓名'},
          {name: 'mobile', label: '联系电话'},
          {name: 'modelCar', label: '车型'},
          {name: 'classType', label: '班别'},
          {name: 'owedAmount', label: '应收账款'},
          {name: 'orderNo', label: '退费订单'},
          {name: 'goodsNames', label: '退费商品'},
          {name: 'goodsBalance', label: '退费商品余额'}
        ]
      }
    },
    components: {
      changeContent
    },
    computed: {
    },
    methods: {
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
      save (flag) {
        let self = this
        let btnArray = ['取消', '确定']
        let titleMsg = flag ? '请输入同意审批意见：' : '请输入拒绝审批意见：'
        mui.prompt(titleMsg, '审批意见', '云驾培', btnArray, e => {
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
        })
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
        let infoData = {url: APIS.processCenter.certStudentRefundApply, method: 'GET', param: infoParam}
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
      console.log(this.base, '-------')
    }
  }
</script>
