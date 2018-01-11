/**
* @file
* @author Leo
* @date 2017/12/25
*/
<template>
  <div>
    <header id="header" class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">班别管理</h1>
    </header>
    <div class="mui-content">
      <div class="mui-scroll-wrapper _mui-scroll-wrapper">
        <div class="mui-scroll">
          <div class="list-title">基本信息</div>
          <div>
            <div class="list-base-information">
              <div class="list-item-left">班别名称</div>
              <div class="list-item-right" v-text="detail.data.name"></div>
            </div>
            <div class="list-base-information">
              <div class="list-item-left">车型</div>
              <div class="list-item-right" v-text="detail.data.driveTypeName"></div>
            </div>
            <div class="list-base-information">
              <div class="list-item-left">外地班属性</div>
              <div class="list-item-right" v-text="getTypeName('market_class_local_flag', detail.data.localFlag)"></div>
            </div>
            <div class="list-base-information" v-if="detail.data.localFlag == '2'">
              <div class="list-item-left">所属城市</div>
              <div class="list-item-right" v-text="detail.data.cityName"></div>
            </div>
            <div class="list-base-information">
              <div class="list-item-left">高端班属性</div>
              <div class="list-item-right" v-text="getTypeName('market_class_high_flag', detail.data.highFlag)"></div>
            </div>
            <div class="list-base-information">
              <div class="list-item-left">学车形式</div>
              <div class="list-item-right" v-text="getTypeName('market_class_study_type', detail.data.studyType)"></div>
            </div>
            <div class="list-base-information">
              <div class="list-item-left">班别描述</div>
              <div class="list-item-right" v-text="detail.data.driveTypeName"></div>
            </div>
          </div>
          <template v-if="detail.list.length > 0">
            <div v-for="item in handleList">
              <div class="list-title" v-text="item.name"></div>
              <div class="mui-row">
                <div class="mui-col-sm-4 mui-col-xs-4">
                  商品名称
                </div>
                <div class="mui-col-sm-3 mui-col-xs-3">
                  单价
                </div>
                <div class="mui-col-sm-2 mui-col-xs-2">
                  数量
                </div>
                <div class="mui-col-sm-3 mui-col-xs-3">
                  总价
                </div>
              </div>
              <div class="mui-row" v-for="cItem in item.children">
                <div class="mui-col-sm-4 mui-col-xs-4" v-text="cItem.goodsName">
                </div>
                <div class="mui-col-sm-3 mui-col-xs-3" v-text="cItem.goodsCount">
                </div>
                <div class="mui-col-sm-2 mui-col-xs-2" v-text="cItem.goodsPrice">
                </div>
                <div class="mui-col-sm-3 mui-col-xs-3" v-text="cItem.goodsCount * cItem.goodsPrice">
                </div>
              </div>
            </div>
          </template>
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
      getData () {
        let postData = {url: APIS.searchClassManage.getClassDetail + this.$route.params.id, method: 'GET'}
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
    created: function () {
    },
    mounted: function () {
      this.getData()
    }
  }
</script>
