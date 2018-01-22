/**
* @file 学员信息变更
* @author Leo
* @date 2017/12/27
*/
<template>
  <div>
    <content-title :titleData="{title: '上课情况变更'}"></content-title>
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
          {name: 'remark', label: '申请原因'},
          {name: 'invoiceName', label: '学员姓名'},
          {name: 'idNum', label: '证件号码'},
          {name: 'mobile', label: '联系电话'},
          {name: 'userName', label: '姓名'}
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
        return [{
          name: '上课状态',
          oldContent: this.getTypeName('student_course_state', this.detail.info.oldState),
          newContent: this.getTypeName('student_course_state', this.detail.info.newState)
        }]
      }
    },
    methods: {
      save (flag) {
        let self = this
        let btnArray = ['取消', '确定']
        let titleMsg = flag ? '请输入同意审批意见：' : '请输入拒绝审批意见：'
        mui.prompt(titleMsg, '审批意见', this.$store.state.base.appName, btnArray, e => {
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
      getDetail () {
        if (!this.$route.params.id) {
          mui.alert('无效的访问')
          return
        }
        let infoParam = {id: this.$route.params.id}
        let infoData = {url: APIS.processCenter.certStudentTheoryCourseChangeApply, method: 'GET', param: infoParam}
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
//            this.detail.processList.reverse()
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
