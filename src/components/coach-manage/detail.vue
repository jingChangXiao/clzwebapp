/**
* @file
* @author Leo
* @date 2017/12/25
*/
<template>
  <div>
    <header id="header" class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">教练管理</h1>
    </header>
    <div class="mui-content">
      <div class="mui-scroll-wrapper _mui-scroll-wrapper">
        <div class="mui-scroll">
          <div>
            <div>
              <div v-text="detail.data.name"></div>
              <div v-text="detail.data.phone"></div>
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
                <div class="list-item-left">性别</div>
                <div class="list-item-right" v-text="detail.data.sex === '0' ? '男' : '女'"></div>
              </div>
            </div>
            <div class="list-title">
              供职信息
            </div>
            <div>
              <div class="list-base-information">
                <div class="list-item-left">供职方式</div>
                <div class="list-item-right" v-text="getTypeName('service_mode', detail.data.serviceMode)"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">供职状态</div>
                <div class="list-item-right" v-text="getTypeName('service_status', detail.data.serviceStatus)"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">入职日期</div>
                <div class="list-item-right" v-text="formatFn(detail.data.entryDate)"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">所属片区</div>
                <div class="list-item-right" v-text="detail.data.ownedArea"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">离职日期</div>
                <div class="list-item-right" v-text="formatFn(detail.data.leaveDate)"></div>
              </div>
            </div>
            <div class="list-title">
              证书信息
            </div>
            <div>
              <div class="list-base-information" v-for="item in tableItemsCertificate">
                <div class="list-item-left" v-text="item.label"></div>
                <div class="list-item-right" v-text="detail.data[item.name]"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">职业资格有效期</div>
                <div class="list-item-right" v-text="formatFn(detail.data.quaDate)"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">驾驶证初领日期</div>
                <div class="list-item-right" v-text="formatFn(detail.data.driverLicenseReceiveDate)"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">驾驶证有效日期止</div>
                <div class="list-item-right" v-text="formatFn(detail.data.driverLicenseEndDate)"></div>
              </div>
            </div>
            <div class="list-title">
              职能信息
            </div>
            <div>
              <div class="list-base-information" v-for="item in tableItemsFunction">
                <div class="list-item-left" v-text="item.label"></div>
                <div class="list-item-right" v-text="detail.data[item.name]"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">带教状态</div>
                <div class="list-item-right" v-text="getTypeName('teaching_status', detail.data.teachingStatus)"></div>
              </div>
            </div>
            <div class="list-title">
              带教信息
            </div>
            <div>
              <div class="list-base-information">
                <div class="list-item-left">带教班别</div>
                <div class="list-item-right" v-text="listEduTeachingClass"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">可带教片区</div>
                <div class="list-item-right" v-text="listEduTeachingArea"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">关联门店</div>
                <div class="list-item-right" v-text="listEduAssociatedStores"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">主要门店</div>
                <div class="list-item-right" v-text="listEduAssociatedStoresMain"></div>
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
        showFlag: 0,
        detail: {
          data: {}
        },
        tableItemsBase: [
          {name: 'idNumber', label: '身份证号'},
          {name: 'type', label: '准教车型'},
          {name: 'address', label: '联系地址'}
        ],
        tableItemsCertificate: [
          {name: 'driverLicenseNo', label: '驾驶证号'},
          {name: 'driveCarType', label: '准驾车型'},
          {name: 'quaNumber', label: '职业资格号'},
          {name: 'quaLevel', label: '职业资格等级'}
        ],
        tableItemsFunction: [
          {name: 'teachingTypeName', label: '带教类型'},
          {name: 'groupManagerName', label: '教学组长'},
          {name: 'teachingCarName', label: '带教车型'},
          {name: 'teachingDutyName', label: '带教职务'},
          {name: 'loadStandard', label: '负荷标准'}
        ]
      }
    },
    computed: {
      listEduTeachingClass () {
        let str = ''
        if (this.detail.data.listEduTeachingClass) {
          this.detail.data.listEduTeachingClass.forEach(item => {
            str += item.className + ','
          })
        }
        return str
      },
      listEduTeachingArea () {
        let str = ''
        if (this.detail.data.listEduTeachingArea) {
          this.detail.data.listEduTeachingArea.forEach(item => {
            str += item.areaName + ','
          })
        }
        return str
      },
      listEduAssociatedStores () {
        let str = ''
        if (this.detail.data.listEduAssociatedStores) {
          this.detail.data.listEduAssociatedStores.forEach(item => {
            str += item.storeName + ','
          })
        }
        return str
      },
      listEduAssociatedStoresMain () {
        let str = ''
        if (this.detail.data.listEduAssociatedStores) {
          this.detail.data.listEduAssociatedStores.forEach(item => {
            if (item.mainStat) {
              str = item.storeName
            }
          })
        }
        return str
      }
    },
    methods: {
      getTypeName (name, value) {
        if (this.getTypeNameData.data && this.getTypeNameData.data[name]) {
          return this.getTypeNameData.data[name][value]
        } else {
          return ''
        }
      },
      changeFlag (flag) {
        this.showFlag = flag
      },
      formatFn (val) {
        var date = new Date(val)
        return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
      },
      getData () {
        let postData = {url: APIS.coachManage.getEduCoachDetail + this.$route.params.id, method: 'POST'}
        api.initAjax(postData).then((rtData) => {
          if (rtData.status) {
            this.detail.data = rtData.data
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
