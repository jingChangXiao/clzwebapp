/**
* @file
* @author Leo
* @date 2017/12/25
*/
<template>
  <div>
    <content-title :titleData="{title: '门店管理'}"></content-title>
    <div class="mui-content">
      <div class="mui-scroll-wrapper _mui-scroll-wrapper">
        <div class="mui-scroll">
          <div class="detail-content">
            <div class="store-media">
              <div style="height:40vw;background-image:url(./static/img/muwu.jpg)"></div>
              <div class="store-name">
                <div class="store-name-left" v-text="detail.data.name"></div>
                <div class="store-name-right">门店代码: <span v-text="detail.data.storeCode"></span></div>
              </div>
            </div>
            <div style="margin-top: 20px;" class="list-base-information-chunk">
              <div class="mui-row" style="background-color:white;border: 1px solid #eee">
                <div class="mui-col-sm-6 mui-col-xs-6 label-div" :class="showFlag === 0 ? 'active' : ''" style="text-align: center" @tap="changeFlag(0)">

                  <span class="label-div-item">基本信息</span>
                </div>
                <div class="mui-col-sm-6 mui-col-xs-6 label-div" :class="showFlag === 1 ? 'active' : ''" style="text-align: center" @tap="changeFlag(1)">
                  <span class="label-div-item">更多信息</span>
                </div>
              </div>
              <div>
                <div v-show="showFlag === 0">
                  <div class="list-base-information" v-for="item in tableItemsBase">
                    <div class="list-item-left" v-text="item.label"></div>
                    <div class="list-item-right" v-text="detail.data[item.name]"></div>
                  </div>
                  <div class="list-base-information">
                    <div class="list-item-left">行政区域</div>
                    <div class="list-item-right" v-text=""></div>
                  </div>
                </div>
                <div v-show="showFlag === 1">
                  <div class="list-base-information" v-for="item in tableItemsMore">
                    <div class="list-item-left" v-text="item.label"></div>
                    <div class="list-item-right" v-text="detail.data[item.name]"></div>
                  </div>
                  <div class="list-base-information">
                    <div class="list-item-left">上班时间</div>
                    <div class="list-item-right"
                         v-text="detail.data.workTimeStart + ' - ' + detail.data.workTimeEnd"></div>
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
  .label-div{
    padding: 15px 0px;
  }
  .store-media{
    border-radius: 10px;
    box-shadow: 0 4px 12px 0 rgba(39,52,56,0.08);
  }
  .store-name {
    display: flex;
    padding: 0px 20px;
    height: 50px;
    line-height: 50px;
    justify-content: space-between;
    background-color: white;
    .store-name-left {
      font-size: 16px;
      color: #3A444A;
      font-weight: 600;
    }
    .store-name-right {
      font-size: 12px;
      color: #666;
    }
  }
</style>
<script>
  import {api} from '@/assets/js/api'
  import {APIS} from '@/assets/js/config'
  export default {
    data () {
      return {
        showFlag: 0,
        detail: {
          data: {}
        },
        tableItemsBase: [
          {name: 'cardName', label: '门店证件照名称'},
          {name: 'areaName', label: '所属片区'},
          {name: 'telephone', label: '固定电话'},
          {name: 'address', label: '门店地址'},
          {name: 'tradingArea', label: '所属商圈'},
          {name: 'landMark', label: '地标建筑名称'},
          {name: 'busStation', label: '公交/地铁站点'}
        ],
        tableItemsMore: [
          {name: 'storeNature', label: '门店性质'},
          {name: 'status', label: '营业状态'},
          {name: 'type', label: '门店类型'},
          {name: 'scale', label: '门店规模'},
          {name: 'openDate', label: '开业时间'}
        ]
      }
    },
    methods: {
      changeFlag (flag) {
        this.showFlag = flag
      },
      getData () {
        let postData = {url: APIS.storeManage.mstoreDetail, method: 'GET', param: {id: this.$route.params.id}}
        api.initAjax(postData).then((rtData) => {
          if (rtData.status) {
            this.detail.data = rtData.data.store
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
