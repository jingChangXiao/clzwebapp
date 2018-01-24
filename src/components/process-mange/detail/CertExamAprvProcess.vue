/**
* @file 学员信息变更
* @author Leo
* @date 2017/12/27
*/
<template>
  <div>
    <content-title :titleData="{title: '考试复批变更'}"></content-title>
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
                <div class="list-item-left">考核类型</div>
                <div class="list-item-right" v-text="getTypeName('inspection_type', detail.info.inspectionType)"></div>
              </div>
            </div>
            <div class="list-title">变更内容</div>
            <change-content :list="changeList"></change-content>
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
          {name: 'remark', label: '备注'},
          {name: 'userName', label: '姓名'},
          {name: 'idNum', label: '证件号码'},
          {name: 'mobile', label: '联系电话'}
        ]
      }
    },
    components: {
      changeContent,
      processAction,
      processRecordList
    },
    computed: {
      changeList () {
        let rtList = []
        if (this.detail.info.changeType === '1') {
          rtList = [{name: this.getTypeName('exam_approval_apply_change_type', this.detail.info.changeType), oldContent: this.detail.info.oldExamRoomName, newContent: this.detail.info.newExamRoomName}]
        } else if (this.detail.info.changeType === '2') {
          rtList = [{name: this.getTypeName('exam_approval_apply_change_type', this.detail.info.changeType), oldContent: this.formatFn(this.detail.info.oldExamDate), newContent: this.formatFn(this.detail.info.newExamDate)}]
        } else if (this.detail.info.changeType === '3') {
          rtList = [{name: this.getTypeName('exam_approval_apply_change_type', this.detail.info.changeType), oldContent: this.detail.info.oldExamTime, newContent: this.detail.info.newExamTime}]
        } else if (this.detail.info.changeType === '4') {
          rtList = [{name: this.getTypeName('exam_approval_apply_change_type', this.detail.info.changeType), oldContent: this.detail.info.oldCoachName, newContent: this.detail.info.newCoachName}]
        }
        return rtList
      }
    },
    methods: {
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
      },
      getDetail () {
        if (!this.$route.params.id) {
          mui.alert('无效的访问')
          return
        }
        let infoParam = {id: this.$route.params.id}
        let infoData = {url: APIS.processCenter.certStudentExamApprovalChangeApply, method: 'GET', param: infoParam}
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
    mounted () {
      this.getDetail()
      console.log(this.getTypeNameData)
    }
  }
</script>
