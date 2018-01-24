/**
* @file
* @author Leo
* @date 2017/12/25
*/
<template>
  <div>
    <content-title :titleData="{title: '商品详细信息'}"></content-title>
    <div class="mui-content">
      <div class="mui-scroll-wrapper _mui-scroll-wrapper">
        <div class="mui-scroll">
          <div class="detail-content">

            <div class="product-name">
              <div class="product-name-left" v-text="detail.data.goodsName"></div>
              <div class="product-name-right" v-text="'¥ ' + detail.data.price"></div>
            </div>
            <div class="list-base-information-chunk">
              <div class="list-base-information" v-for="item in tableItemsBase">
                <div class="list-item-left" v-text="item.label"></div>
                <div class="list-item-right" v-text="detail.data[item.name]"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">商品属性</div>
                <div class="list-item-right" v-text="getTypeName('market_goods_attribute', detail.data.attribute)"></div>
              </div>
              <div class="remark">
                <div class="remark-title">备注</div>
                <div class="remark-content" v-text="detail.data.remark || '暂无备注'"></div>
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
                <div class="list-item-left">退费规则</div>
                <div class="list-item-right" v-text="detail.data.refund ? '可退费' : '不可退费'"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">代销合作商家</div>
                <div class="list-item-right" v-text="detail.data.agencySellGoods ? detail.data.agencySellerName : '无'"></div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">是否自动过期</div>
                <div class="list-item-right" v-text="detail.data.projectId ? '是' : '否'"></div>
              </div>
              <div class="list-base-information" v-show="detail.data.projectId">
                <div class="list-item-left">有效期开始节点</div>
                <div class="list-item-right" v-text="detail.data.projectName + '/' + detail.data.projectStatus"></div>
              </div>
              <div class="list-base-information" v-show="detail.data.projectId">
                <div class="list-item-left">有效期</div>
                <div class="list-item-right" v-text="detail.data.validityPeriod"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang='less' rel='stylesheet.less' scoped>
.product-name{
  display: flex;
  padding: 0px 20px;
  height: 76px;
  line-height: 76px;
  justify-content: space-between;
  background-color:white;
  .product-name-left{
    font-size: 16px;
    color: #3A444A;
    font-weight: 600;
  }
  .product-name-right{
    font-size: 16px;
    color: #ff7323;
  }
}
.remark{
  padding: 0px 10px 10px;
  background-color: white;
  color: #333;
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
          {name: 'goodsUnitName', label: '商品单元'},
          {name: 'goodsCode', label: '商品编码'},
          {name: 'inventory', label: '商品库存'}
        ],
        tableItemsOther: [
          {name: 'goodsCell', label: '商品单位'}
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
        let postData = {url: APIS.productManage.getGoodsDetail, method: 'GET', param: {id: this.$route.params.id}}
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
