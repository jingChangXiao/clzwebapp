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
                <div class="list-item-left">商品名称：</div>
                <div class="list-item-right">
                  <input v-model="inputData.name" placeholder="请输入...">
                </div>
              </div>
              <div class="list-base-information" @tap="highFlag">
                <div class="list-item-left">外地班属性：</div>
                <div class="list-item-right">
                  <div class="select-arrow iconfont" v-text="inputData.highFlagName"></div>
                </div>
              </div>
              <div class="list-base-information" @tap="localFlag">
                <div class="list-item-left">是否高端：</div>
                <div class="list-item-right">
                  <div class="select-arrow iconfont" v-text="inputData.localFlagName"></div>
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
  .list-base-information:first-child {
    justify-content: left;
    .list-item-left {
      width: 27%;
    }
    .list-item-right {
      width: 70%;
      text-align: left;
      input {
        border: none;
        font-size: 13px;
        color: #545252;
        line-height: 30px;
      }
      input::-moz-placeholder {
        color: #a3a3a3;
      }
      input::-webkit-input-placeholder {
        color: #a3a3a3;
      }
      input:-ms-input-placeholder {
        color: #a3a3a3;
      }
      input::placeholder {
        color: #a3a3a3;
      }
    }
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
        list: this.$store.state.workList.searchClassList,
        inputData: {
          name: '',
          highFlagName: '',
          highFlag: '',
          localFlagName: '',
          localFlag: ''
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
        this.inputData.highFlagName = ''
        this.inputData.highFlag = ''
        this.inputData.localFlagName = ''
        this.inputData.localFlag = ''
      },
      highFlag (flag) {
        this.selectFlag = flag
        let self = this
        let userPicker = new mui.PopPicker()
        userPicker.setData(this.$store.state.base.searchSelectData.market_class_high_flag)
        userPicker.show(items => {
          self.inputData.highFlagName = items[0].text
          self.inputData.highFlag = items[0].value
        })
      },
      localFlag (flag) {
        this.selectFlag = flag
        let self = this
        let userPicker = new mui.PopPicker()
        userPicker.setData(this.$store.state.base.searchSelectData.market_class_local_flag)
        userPicker.show(items => {
          self.inputData.localFlagName = items[0].text
          self.inputData.localFlag = items[0].value
        })
      }
    },
    created () {
    },
    mounted () {
      Object.keys(this.inputData).forEach(item => {
        this.inputData[item] = this.list.searchObject[item]
      })
    }
  }
</script>
