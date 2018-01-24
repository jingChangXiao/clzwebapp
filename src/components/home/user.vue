/**
* @file 主页内容
* @author Leo
* @date 2017/12/19
*/
<template>
  <div id="userCenter">
    <div class="mui-content" style="padding-bottom: 50px;">
      <img :src="url" style="width: 100%">
      <div class="user-header">
        <span class="user-setting mui-icon mui-icon-gear"></span>
        <img :src="getPhoto(userDetail.data.photo)" @error="imgOnerror($event)" @tap="goRoueter('/userDetail')" class="photo-img">
        <p>
          <span v-text="userDetail.data.name"></span>
          <span v-text="userDetail.data.positionName"></span>
        </p>
      </div>
      <ul class="mui-table-view">
        <li class="mui-table-view-cell">
          <div class="mui-navigate-right">
            <span class="iconfont icon-qr_code" style="color:#85E477"></span>
            <span class="mui-pull-left">我的二维码</span>
          </div>
        </li>
        <li class="mui-table-view-cell" @tap="goRoueter('/editPassword')">
          <div class="mui-navigate-right">
            <span class="iconfont icon-lock" style="color:#66A7F3"></span>
            <span class="mui-pull-left">修改密码</span>
          </div>
        </li>
        <li class="mui-table-view-cell" @tap="goRoueter('/version')">
          <div class="mui-navigate-right">
            <span class="iconfont icon-version" style="color:#85E1F4;"></span>
            <span class="mui-pull-left">当前版本</span>
          </div>
        </li>
        <li class="mui-table-view-cell" @tap="goRoueter('/scoreCenter')">
          <div class="mui-navigate-right">
            <span class="iconfont icon-feedback" style="color:#E79842"></span>
            <span class="mui-pull-left">帮助与反馈</span>
          </div>
        </li>
      </ul>
      <div class="login-btn">
        <div class="demo-flat-button toRight" @tap="goRoueter('/login')">退出登录</div>
        <!--<mu-flat-button label="登录" class="demo-flat-button" color="#FFF" @click="login"/>-->
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .photo-img{
    box-shadow: 0 8px 22px 0 rgba(48,57,61,0.05);
    border: 1px solid #F8833D;
  }
  .demo-flat-button {
    height: 45px;
    line-height:45px;
    color:white;
    font-size: 16px;
    border-radius: 22px;
    text-align: center;
    box-shadow: 0 17px 62px 0 rgba(255,142,42,0.20);
    width: 80%;
    margin: auto;
    margin-top: 30px;
  }
  .toRight {
    background-image: -webkit-linear-gradient(to right, #ff7626, #ffab68);
    background-image: linear-gradient(to right,#ff7626,#ffab68);
  }
  #userCenter {
    .my-msg-number {
      display: inline-block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: red;
      float: right;
      margin-right: 20px;
      color: white;
      text-align: center;
      line-height: 20px;
      font-size: 10px;
    }
    .mui-table-view {
      box-shadow: 0 4px 10px 0 rgba(39,52,56,0.17);
      border-radius: 8px;
      margin: 0px 10px;
    }
    .mui-table-view::before{
      display: none;
    }
    .mui-table-view::after{
      display: none;
    }
    .mui-table-view-cell {
      font-size: 14px;
      clear: both;
      padding: 18px 15px;
      .mui-icon {
        font-size: 20px;
        padding-right: 16px;
        float: left;
        display: inline-block;
        width: 40px;
      }
      .mui-navigate-right {
        .iconfont{
          float: left;
          margin-right: 10px;
        }
        .mui-pull-left {
          color: #303030;
        }
      }
    }
    .user-header {
      top:0px;
      position: absolute;
      width: 100%;
      height: 200px;
      background-size: cover;
      text-align: center;
      overflow: hidden;
      box-sizing: border-box;
      .user-setting {
        position: absolute;
        right: 10px;
        top: 10px;
        color: white;
      }
      img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
        margin-top: 40px;
      }
      p {
        color: #ffffff;
        span {
          display: block;
          &:nth-of-type(2) {
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
<script>
  import {mapActions} from 'vuex'
  export default{
    data () {
      return {
        url: './static/img/user_bg.png',
        backgroundObj: 'url("./static/img/user_bg.png") repeat-y',
        background: {
          backgroundImage: 'url("./static/img/user_bg.png")',
          backgroundSize: '100%, 100%'
        },
        userDetail: this.$store.state.userInfo.userDetail,
        eCubeImg: './static/img/user_img_m.png',
        eImg: './static/img/user_img_m.png'
      }
    },
    computed: {},
    methods: {
      ...mapActions([
        'ACTION_GET_USER_DETAIL'
      ]),
      getPhoto (url) {
        return url || this.eCubeImg
      },
      imgOnerror (event, type) {
        if (type) {
          event.target.src = this.eCubeImg
        } else {
          event.target.src = this.eImg
        }
      },
      goRoueter (index) {
        this.$router.push(index)
      }
    },
    created: function () {
    },
    mounted () {
      this.ACTION_GET_USER_DETAIL().then(item => {
        console.log(this.userDetail)
      })
    }
  }
</script>
