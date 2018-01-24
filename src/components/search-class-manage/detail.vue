/**
* @file
* @author Leo
* @date 2017/12/25
*/
<template>
  <div>
    <content-title :titleData="{title: '班别管理'}"></content-title>
    <div class="mui-content">
      <div class="mui-scroll-wrapper _mui-scroll-wrapper">
        <div class="mui-scroll">
          <div class="detail-content">
            <div class="list-base-information-chunk">
              <div class="mui-media-body" style="padding:15px 20px;border-bottom: 1px dashed #ccc">
                <span style="display: flex;">
                  <span style="color:#3A444A;font-size:16px;font-weight: 600" v-text="detail.data.name"></span>
                  <span class="item-teachingTypeName" v-text="getTypeName('market_class_high_flag', detail.data.highFlag)"></span>
                  <span class="item-teachingCarName" v-text="detail.data.driveTypeName"></span>
                </span>
                <div class='mui-ellipsis' style="font-size: 12px;margin-top: 8px;color: #7F7F7F;">
                  <div>
                    <span v-text="getTypeName('market_class_local_flag', detail.data.localFlag)"></span>
                    <span v-if="detail.data.localFlag == '2'" v-text="'/' + detail.data.cityName"></span>
                    <span v-text="getTypeName('market_class_study_type', detail.data.studyType)" style="margin-left:20px;"></span>
                  </div>
                </div>
              </div>
              <div class="remark">
                <div class="remark-title">班别描述：</div>
                <div class="remark-content" v-text="detail.data.remark || '暂无描述'"></div>
              </div>
            </div>
            <div class="list-title">套餐详情</div>
            <div class="list-base-information-chunk">
              <template v-if="detail.list.length > 0">
                <div v-for="item in handleList">
                  <div class="store-list-title mui-icon">
                    <span v-text="item.name"></span>
                  </div>
                  <div class="mui-row mui-row-list store-font-title">
                    <div class="mui-col-sm-4 mui-col-xs-4 store-font">
                      商品名称
                    </div>
                    <div class="mui-col-sm-3 mui-col-xs-3 store-font">
                      单价
                    </div>
                    <div class="mui-col-sm-2 mui-col-xs-2 store-font">
                      数量
                    </div>
                    <div class="mui-col-sm-3 mui-col-xs-3 store-font">
                      总价
                    </div>
                  </div>
                  <div class="mui-row mui-row-list store-font-content" v-for="cItem in item.children">
                    <div class="mui-col-sm-4 mui-col-xs-4 store-font" v-text="cItem.goodsName">
                    </div>
                    <div class="mui-col-sm-3 mui-col-xs-3 store-font" v-text="cItem.goodsCount">
                    </div>
                    <div class="mui-col-sm-2 mui-col-xs-2 store-font" v-text="cItem.goodsPrice">
                    </div>
                    <div class="mui-col-sm-3 mui-col-xs-3 store-font" v-text="cItem.goodsCount * cItem.goodsPrice">
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang='less' rel='stylesheet.less' scoped>
  .store-list-title{
    height: 60px;
    line-height: 60px;
    color: #ff7323;
    font-size: 16px;
    padding: 0px 20px;
    border-bottom: 1px solid #eee;
    width: 100%;
  }
  .store-list-title::after{
    content:"\e581";
    font-size: 16px;
    float:right;
  }
  .store-font{
    padding: 14px 0px;
    text-align: center;
  }
  .store-font-title{
    color: #333;
    font-size: 14px;
  }
  .store-font-content{
    color: #666;
    font-size: 12px;
  }

  .mui-row-list{
    border-bottom: 1px solid #eee;
  }

  .remark{
    padding: 10px 20px;
    background-color: white;
    color: #666;
    border-top: 1px dashed white;
    .remark-title{
      font-size: 14px;
      height: 30px;
      line-height:30px;
    }
    .remark-content{
      font-size: 12px;
      max-height: 60px;
      color: #999;
      overflow: hidden;
    }
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
        getTypeNameData: this.$store.state.base.dictCacheData,
        showFlag: 0,
        detail: {
          data: {},
          list: []
        }
      }
    },
    computed: {
      handleList () {
        let data = {}
        this.detail.list.forEach(item => {
          if (data[item.id]) {
            data[item.id].push(item)
          } else {
            data[item.id] = [item]
          }
        })
        let list = []
        Object.keys(data).forEach(item => list.push({key: item, children: data[item], name: data[item][0].name}))
        return list
      }
    },
    methods: {
      changeFlag (flag) {
        this.showFlag = flag
      },
      getData () {
        let postData = {url: APIS.searchClassManage.getClassDetail, method: 'GET', param: {id: this.$route.params.id}}
        api.initAjax(postData).then((rtData) => {
          if (rtData.status) {
            this.detail.data = rtData.data.marketClass
            this.detail.list = rtData.data.list
          } else {
            mui.alert(rtData.message)
          }
        }, (rtData) => {
          mui.alert(rtData.message)
        })
      }
    },
    created () {
    },
    mounted () {
      this.getData()
    }
  }
</script>
