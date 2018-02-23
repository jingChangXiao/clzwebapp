/**
* @file 个人详细信息
* @author Leo
* @date 2017/12/19
*/
<template>
  <div>
    <content-title :titleData="{title: '当前版本'}"></content-title>
    <div class="mui-content div-user-center">
      <div class="mui-scroll-wrapper" style="top:45px;">
        <div class="mui-scroll" style="padding: 10px;">
          <div class="app-title-img">
            <div>
              <img src="../../../static/img/logo.png" alt="哩哩云驾校" />
              <div>哩哩云驾校</div>
            </div>
          </div>
          <div class="list-base-information-chunk">
            <div class="list-base-information">
              <div class="list-item-left">版本号</div>
              <div class="list-item-right">
                <span>V&nbsp;1.0</span>
              </div>
            </div>
            <div class="list-base-information activeT">
              <div class="list-item-left">检查更新</div>
              <div class="mui-navigate-right">
              </div>
            </div>
            <div class="list-base-information activeT" @tap="activeItem">
              <div class="list-item-left">版本日志</div>
              <div class="mui-navigate-right">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .app-title-img {
    height: 249px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-bottom: 1px solid #eee;
    -webkit-border-radius: 8px 8px 0 0;
    -moz-border-radius: 8px 8px 0 0;
    border-radius: 8px 8px 0 0;
    div {
      width: 100%;
      text-align: center;
      img {
        width: 32%;
      }
      div {
        font-family: PingFangSC-Regular;
        text-align: center;
        font-size: 16px;
        color: #080808;
        margin-top: 3px;
        letter-spacing: 1px;
      }
    }
  }
  .list-base-information {
    padding: 5px 15px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
  }
  .mui-navigate-right::after {
    color: #888;
  }
  .activeT:active {
    background-color: #e2e2e2;
  }
</style>
<script>
  export default{
    data () {
      return {
      }
    },
    computed: {},
    methods: {
      activeItem () {
        this.$router.push('/versionInformation')
      }
    }
  }
</script>
