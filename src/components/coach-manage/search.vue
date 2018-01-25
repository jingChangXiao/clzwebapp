/**
* @file
* @author Leo
* @date 2017/12/25
*/
<template>
  <div>
    <content-title :titleData="{title: '更多查询', right: '重置'}" @rightClick="restFn"></content-title>
    <div class="mui-content">
      <div class="mui-scroll-wrapper" :style="liCss">
        <div class="mui-scroll">
          <div class="detail-content">
            <div class="list-base-information-chunk">
              <div class="list-base-information">
                <div class="list-item-left">教练名称：</div>
                <div class="list-item-right">
                  <input v-model="inputData.name" placeholder="请输入...">
                </div>
              </div>
              <div class="list-base-information" @tap="storeId">
                <div class="list-item-left">所属门店：</div>
                <div class="list-item-right">
                  <div class="select-arrow iconfont" v-text="inputData.storeIdName"></div>
                </div>
              </div>
              <div class="list-base-information" @tap="teachingDutyId">
                <div class="list-item-left">带教职务：</div>
                <div class="list-item-right">
                  <div class="select-arrow iconfont" v-text="inputData.teachingDutyIdName"></div>
                </div>
              </div>
              <div class="list-base-information" @tap="classId">
                <div class="list-item-left">带教班别：</div>
                <div class="list-item-right">
                  <div class="select-arrow iconfont" v-text="inputData.classIdName"></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="demo-flat-button toRight" @tap="search">查询</div>
            <!--<mu-flat-button label="登录" class="demo-flat-button" color="#FFF" @click="login"/>-->
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<style lang='less' rel='stylesheet.less' scoped>
  .select-arrow::after {
    content: '\e6c0';
    padding-left: 5px;
  }

  .demo-flat-button {
    height: 45px;
    line-height: 45px;
    color: white;
    font-size: 16px;
    border-radius: 22px;
    text-align: center;
    box-shadow: 0 17px 62px 0 rgba(255, 142, 42, 0.20);
    width: 80%;
    margin: auto;
    margin-top: 30px;
  }

  .toRight {
    background-image: -webkit-linear-gradient(to right, #ff7626, #ffab68);
    background-image: linear-gradient(to right, #ff7626, #ffab68);
  }
</style>
<script>
  //  import refreshScroll from '@/assets/js/refresh-scroll'
  export default {
    data () {
      return {
        list: this.$store.state.workList.getCoachList,
        inputData: {
          name: '',
          areaId: '',
          areaIdName: '',
          teachingStatus: '',
          teachingStatusName: '',
          storeIdName: '',
          storeId: '',
          teachingDutyIdName: '',
          teachingDutyId: '',
          classId: '',
          classIdName: ''
        },
        liCss: {
          top: '44px',
          bottom: '0'
        }
      }
    },
    methods: {
      search () {
        Object.keys(this.inputData).forEach(item => {
          this.list.searchObject[item] = this.inputData[item]
        })
        mui.back()
      },
      restFn () {
        this.inputData.name = ''
        this.inputData.storeId = ''
        this.inputData.storeIdName = ''
        this.inputData.market_check_wayName = ''
        this.inputData.market_check_way = ''
      },
      storeId (flag) {
        this.selectFlag = flag
        let self = this
        let userPicker = new mui.PopPicker({layer: 2})
        userPicker.setData(this.$store.state.base.ajaxCacheData.findAreaAndStoreNamesCascade.data)
        userPicker.show(items => {
          self.inputData.storeIdName = items[0].text + '/' + (items[1].text || '')
          self.inputData.storeId = items[1].value || ''
        })
      },
      teachingDutyId (flag) {
        this.selectFlag = flag
        let self = this
        let userPicker = new mui.PopPicker()
        userPicker.setData(this.$store.state.base.ajaxCacheData.getTeachingTypeListMes.data)
        userPicker.show(items => {
          self.inputData.teachingDutyIdName = items[0].text
          self.inputData.teachingDutyId = items[0].value
        })
      },
      classId (flag) {
        this.selectFlag = flag
        let self = this
        let userPicker = new mui.PopPicker()
        userPicker.setData(this.$store.state.base.ajaxCacheData.getClassList.data)
        userPicker.show(items => {
          self.inputData.classIdName = items[0].text
          self.inputData.classId = items[0].value
        })
      },
      initInputData () {
        Object.keys(this.inputData).forEach(item => {
          this.inputData[item] = this.list.searchObject[item]
        })
      }
    },
    created () {
    },
    mounted () {
      this.initInputData()
    }
  }
</script>
