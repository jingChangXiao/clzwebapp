/**
* @file
* @author Leo
* @date 2017/12/25
*/
<template>
  <div>
    <content-title :titleData="{title: '车辆管理'}"></content-title>
    <div class="mui-content">
      <div class="mui-scroll-wrapper _mui-scroll-wrapper">
        <div class="mui-scroll">
          <div class="detail-content">
            <div class="list-base-information-chunk">
              <div class="mui-media-body" style="padding:15px 20px;border-bottom: 1px dashed #ccc">
                <span style="display: flex;">
                  <span style="color:#3A444A;font-size:16px;font-weight: 600" v-text="detail.data.plateNumber"></span>
                  <span class="item-teachingTypeName" v-text="detail.data.usePropertiesName"></span>
                  <span class="item-teachingCarName" v-text="detail.data.carStyle"></span>
                </span>
                <div class='mui-ellipsis' style="font-size: 12px;margin-top: 8px;color: #7F7F7F;">
                  <div>
                    <span v-text="'原车牌号：' + detail.data.oldPlateNumber"></span>
                  </div>
                </div>
              </div>

              <div class="list-base-information" v-for="item in tableItemsBase">
                <div class="list-item-left" v-text="item.label"></div>
                <div class="list-item-right" v-text="detail.data[item.name]"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">车牌颜色</div>
                <div class="list-item-right" v-text="getTypeName('plate_color', detail.data.plateColor)"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">燃料种类</div>
                <div class="list-item-right" v-text="getTypeName('plate_color', detail.data.fuelype)"></div>
              </div>
            </div>
            <div class="list-title">
              使用信息
            </div>
            <div class="list-base-information-chunk">
              <div class="list-base-information" v-for="item in tableItemsUse">
                <div class="list-item-left" v-text="item.label"></div>
                <div class="list-item-right" v-text="detail.data[item.name]"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">使用状态</div>
                <div class="list-item-right" v-text="getTypeName('vehicle_status', detail.data.useStatus)"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">租出日期</div>
                <div class="list-item-right" v-text="formatFn(detail.data.leaseOutDate) + ' 至 ' + formatFn(detail.data.leaseOutDateEnd)"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">收款日期</div>
                <div class="list-item-right" v-text="formatFn(detail.data.dateCollection)"></div>
              </div>
            </div>
            <div class="list-title">
              其他信息
            </div>
            <div class="list-base-information-chunk">
              <div class="list-base-information" v-for="item in tableItemsOther">
                <div class="list-item-left" v-text="item.label"></div>
                <div class="list-item-right" v-text="detail.data[item.name]"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">出厂日期</div>
                <div class="list-item-right" v-text="formatFn(detail.data.dateProduction)"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">购买日期</div>
                <div class="list-item-right" v-text="formatFn(detail.data.purchaseDate)"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">登记日期</div>
                <div class="list-item-right" v-text="formatFn(detail.data.registerDate)"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">强制报废日期</div>
                <div class="list-item-right" v-text="formatFn(detail.data.scrapDate)"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">排量/功率</div>
                <div class="list-item-right" v-text="detail.data.displace + '/' + detail.data.power"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">轮距(前后)</div>
                <div class="list-item-right" v-text="detail.data.treadBefore + '/' + detail.data.treadAfter"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">轮胎数/规格</div>
                <div class="list-item-right" v-text="detail.data.tireNumber + '/' + detail.data.tireSpec"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">外轮廓长/宽/高</div>
                <div class="list-item-right" v-text="detail.data.outlineLong + '/' + detail.data.outlineWide + '/' + detail.data.outlineHigh"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang='less' rel='stylesheet.less' scoped>
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
        getTypeNameData: this.$store.state.base.dictCacheData,
        showFlag: 0,
        detail: {
          data: {}
        },
        tableItemsBase: [
          {name: 'carStyle', label: '车型'},
          {name: 'ownerShipName', label: '所属权'},
          {name: 'trainingGroundName', label: '训练场'},
          {name: 'parkingName', label: '停放地点'},
          {name: 'address', label: '固定资产编号'}
        ],
        tableItemsUse: [
          {name: 'useOrgName', label: '使用机构'},
          {name: 'useDeptName', label: '使用部门'},
          {name: 'oilCardNumber', label: '油卡卡号'},
          {name: 'userName', label: '使用人'},
          {name: 'techType', label: '带教类型'},
          {name: 'usePropertiesName', label: '使用性质'},
          {name: 'rentOutPrice', label: '租金金额'},
          {name: 'price', label: '售价'}
        ],
        tableItemsOther: [
          {name: 'manufacturerName', label: '生产厂家'},
          {name: 'vehicleBrandName', label: '品牌'},
          {name: 'vehicleModel', label: '车辆型号'},
          {name: 'purchasePrice', label: '购买价格'},
          {name: 'vehicleFileNumber', label: '机动车档案编号'},
          {name: 'registerAuthName', label: '等级机关'},
          {name: 'vehicleFileNumber', label: '机动车档案编号'},
          {name: 'vehicleCerNumber', label: '机动车登记证书编号'},
          {name: 'engineNumber', label: '发动机号'},
          {name: 'engineModel', label: '发动机型号'},
          {name: 'frameNumber', label: '车驾号'},
          {name: 'vehicleFileNumber', label: '机动车档案编号'},
          {name: 'wheelBase', label: '轴距'}
        ]
      }
    },
    computed: {
    },
    methods: {
      changeFlag (flag) {
        this.showFlag = flag
      },
      getData () {
        let postData = {url: APIS.carManage.carInfoDetail, method: 'GET', param: {id: this.$route.params.id}}
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
    mounted () {
      this.getData()
    }
  }
</script>
