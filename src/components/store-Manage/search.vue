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
              <div class="list-base-information search-more-information">
                <div class="list-item-left">门店名称：</div>
                <div class="list-item-right">
                  <input v-model="inputData.name" placeholder="请输入...">
                </div>
              </div>
              <div class="list-base-information search-more-information">
                <div class="list-item-left">门店代码：</div>
                <div class="list-item-right">
                  <input v-model="inputData.code" placeholder="请输入...">
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

  .list-base-information-chunk {
    .list-base-information {
      justify-content: center;

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
        list: this.$store.state.workList.searchMStoreByCondition,
        inputData: {
          name: '',
          code: ''
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
      restFn: function () {
        this.inputData.name = ''
        this.inputData.code = ''
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
