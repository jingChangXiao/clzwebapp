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
                <div class="list-item-left">车牌号：</div>
                <div class="list-item-right">
                  <input v-model="inputData.plateNumber" placeholder="请输入...">
                </div>
              </div>
              <div class="list-base-information">
                <div class="list-item-left">使用人员：</div>
                <div class="list-item-right">
                  <input v-model="inputData.userName" placeholder="请输入...">
                </div>
              </div>
              <div class="list-base-information" @tap="selectArea">
                <div class="list-item-left">所在片区：</div>
                <div class="list-item-right">
                  <div class="select-arrow iconfont" v-text="inputData.areaIdName"></div>
                </div>
              </div>
              <div class="list-base-information" @tap="isFile">
                <div class="list-item-left">是否备案：</div>
                <div class="list-item-right">
                  <div class="select-arrow iconfont" v-text="inputData.isFileName"></div>
                </div>
              </div>
              <div class="list-base-information" @tap="coty">
                <div class="list-item-left">车龄：</div>
                <div class="list-item-right">
                  <div class="select-arrow iconfont" v-text="inputData.cotyName"></div>
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
        list: this.$store.state.workList.carInfoList,
        inputData: {
          plateNumber: '',
          userName: '',
          areaId: '',
          areaIdName: '',
          isFile: ''
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
        this.inputData.plateNumber = ''
        this.inputData.userName = ''
        this.inputData.areaId = ''
        this.inputData.areaIdName = ''
        this.inputData.isFile = ''
        this.inputData.isFileName = ''
        this.inputData.coty = ''
        this.inputData.cotyName = ''
      },
      selectArea () {
        let self = this
        let userPicker = new mui.PopPicker()
        userPicker.setData(this.$store.state.base.searchSelectData.area)
        userPicker.show(items => {
          self.inputData.areaIdName = items[0].text
          self.inputData.areaId = items[0].value
        })
      },
      isFile () {
        let self = this
        let userPicker = new mui.PopPicker()
        userPicker.setData(this.$store.state.base.searchSelectData.isFile)
        userPicker.show(items => {
          self.inputData.isFileName = items[0].text
          self.inputData.isFile = items[0].value
        })
      },
      coty () {
        let self = this
        let userPicker = new mui.PopPicker()
        userPicker.setData(this.$store.state.base.searchSelectData.vehicle_age)
        userPicker.show(items => {
          self.inputData.cotyName = items[0].text
          self.inputData.coty = items[0].value
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
