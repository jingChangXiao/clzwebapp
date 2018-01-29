/**
* @file
* @author Leo
* @date 2017/12/25
*/
<template>
  <div>
    <content-title :titleData="{title: '教练管理'}"></content-title>
    <div class="mui-content">
      <div class="mui-scroll-wrapper _mui-scroll-wrapper">
        <div class="mui-scroll">
          <div class="detail-content">
            <div class="list-base-information-chunk">
              <div class="base-top-user" style="position: relative">
                <span class="mui-media-object mui-pull-left mui-pull-left-flag">
                  <img :src="imgSrc" width="100%">
                </span>
                <div class="mui-media-body" style="padding-left: 82px;">
                <span style="display: flex;">
                  <span style="color:#3A444A;font-size:16px;" v-text="detail.data.name"></span>
                  <span class="item-teachingTypeName" v-text="detail.data.teachingTypeName"></span>
                  <span class="item-teachingCarName" v-text="detail.data.teachingCarName"></span>
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
                <div class="list-item-right">
                  <div v-text="detail.data[item.name]"></div>
                </div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">性别</div>
                <div class="list-item-right">
                  <div v-text="detail.data.sex === '0' ? '男' : '女'"></div>
                </div>
              </div>
            </div>
            <div class="list-title">
              供职信息
            </div>
            <div class="list-base-information-chunk">
              <div class="list-base-information">
                <div class="list-item-left">供职方式</div>
                <div class="list-item-right">
                  <div v-text="getTypeName('service_mode', detail.data.serviceMode)"></div>
                </div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">供职状态</div>
                <div class="list-item-right">
                  <div v-text="getTypeName('service_status', detail.data.serviceStatus)"></div>
                </div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">入职日期</div>
                <div class="list-item-right">
                  <div v-text="formatFn(detail.data.entryDate)"></div>
                </div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">所属片区</div>
                <div class="list-item-right">
                  <div v-text="detail.data.ownedArea"></div>
                </div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">离职日期</div>
                <div class="list-item-right">
                  <div v-text="formatFn(detail.data.leaveDate)"></div>
                </div>
              </div>
            </div>
            <div class="list-title">
              证书信息
            </div>
            <div class="list-base-information-chunk">
              <div class="list-base-information" v-for="item in tableItemsCertificate">
                <div class="list-item-left" v-text="item.label"></div>
                <div class="list-item-right">
                  <div v-text="detail.data[item.name]"></div>
                </div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">职业资格有效期</div>
                <div class="list-item-right">
                  <div v-text="formatFn(detail.data.quaDate)"></div>
                </div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">驾驶证初领日期</div>
                <div class="list-item-right">
                  <div v-text="formatFn(detail.data.driverLicenseReceiveDate)"></div>
                </div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">驾驶证有效日期止</div>
                <div class="list-item-right">
                  <div v-text="formatFn(detail.data.driverLicenseEndDate)"></div>
                </div>
              </div>
            </div>
            <div class="list-title">
              职能信息
            </div>
            <div class="list-base-information-chunk">
              <div class="list-base-information" v-for="item in tableItemsFunction">
                <div class="list-item-left" v-text="item.label"></div>
                <div class="list-item-right">
                  <div v-text="detail.data[item.name]"></div>
                </div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">带教状态</div>
                <div class="list-item-right">
                  <div v-text="getTypeName('teaching_status', detail.data.teachingStatus)"></div>
                </div>
              </div>
            </div>
            <div class="list-title">
              带教信息
            </div>
            <div class="list-base-information-chunk">
              <div class="list-base-information">
                <div class="list-item-left">带教班别</div>
                <div class="list-item-right">
                  <div v-text="listEduTeachingClass"></div>
                </div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">可带教片区</div>
                <div class="list-item-right">
                  <div v-text="listEduTeachingArea"></div>
                </div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">关联门店</div>
                <div class="list-item-right">
                  <div v-text="listEduAssociatedStores"></div>
                </div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">主要门店</div>
                <div class="list-item-right">
                  <div v-text="listEduAssociatedStoresMain"></div>
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

  .list-base-information {
    align-items: center;
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
        let listEduTeachingClass = this.detail.data.listEduTeachingClass
        return listEduTeachingClass ? this.concatStr(listEduTeachingClass, 'className') : ''
      },
      listEduTeachingArea () {
        let listEduTeachingArea = this.detail.data.listEduTeachingArea
        return listEduTeachingArea ? this.concatStr(listEduTeachingArea, 'areaName') : ''
      },
      listEduAssociatedStores () {
        let listEduAssociatedStores = this.detail.data.listEduAssociatedStores
        return listEduAssociatedStores ? this.concatStr(listEduAssociatedStores, 'storeName') : ''
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
      changeFlag (flag) {
        this.showFlag = flag
      },
      getData () {
        let postData = {url: APIS.coachManage.getEduCoachDetail + this.$route.params.id, method: 'GET'}
        api.initAjax(postData).then((rtData) => {
          if (rtData.status) {
            this.detail.data = rtData.data
          } else {
            mui.alert(rtData.message)
          }
        }, (rtData) => {
          mui.alert(rtData.message)
        })
      },
      // 拼接字符串
      concatStr (arr, key) {
        let result = ''
        arr.forEach((item) => {
          result += item[key] + ','
        })
        return result.replace(/[,]$/, '')
      }
    },
    created () {
    },
    mounted () {
      this.getData()
    }
  }
</script>
