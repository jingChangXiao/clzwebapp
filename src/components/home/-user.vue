/**
* @file 主页内容
* @author Leo
* @date 2017/12/19
*/
<template>
  <div>
    <content-title :titleData="{title: '个人中心',left: true}"></content-title>
    <div class="mui-content div-user-center">
      <div class="mui-scroll-wrapper" style="top:45px;">
        <div class="mui-scroll">
          <ul class="mui-table-view mui-table-view-chevron">
            <li class="mui-table-view-cell mui-media" @tap="goRoueter('/userDetail')">
              <a class="mui-navigate-right" href="#account">
                <img class="mui-media-object mui-pull-left head-img" :src="userDetail.data.photo">
                <div class="mui-media-body">
                  <span v-text="userDetail.data.name"></span>
                  <p class='mui-ellipsis' v-text="userDetail.data.positionName"></p>
                </div>
              </a>
            </li>
          </ul>

          <ul class="mui-table-view mui-table-view-chevron" style="margin-top: 20px;">
            <li class="mui-table-view-cell">
              <a class="mui-navigate-right"><span class="mui-icon mui-icon-more"></span>我的二维码</a>
            </li>
            <li class="mui-table-view-cell" @tap="goRoueter('/editPassword')">
              <a class="mui-navigate-right"><span class="mui-icon mui-icon-locked" ></span>修改密码</a>
            </li>
            <li class="mui-table-view-cell" @tap="goRoueter('/version')">
              <a class="mui-navigate-right">
                <span class="mui-icon mui-icon-settings"></span>当前版本
                <span class="mui-pull-right right-version">V1.0.0</span>
              </a>
            </li>
          </ul>

          <div class="login-div" @tap="goRoueter('/login')">
              退出登录
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .right-version{
    font-size: 12px;
    color: #666;
    margin: 4px -20px 0px 0px;
  }
  .mui-icon {
    margin-right: 10px;
    color: #666;
  }
  .login-div {
    margin: auto;
    margin-top: 80px;
    width: 80%;
    border-radius: 10px;
    text-align: center;
    height: 35px;
    line-height: 35px;
    background: #007aff;
    color: white;
  }
</style>
<script>
  import {mapActions} from 'vuex'
  export default{
    data () {
      return {
        userDetail: this.$store.state.userInfo.userDetail,
        eCubeImg: './static/img/ic-default-user.png',
        eImg: './static/ic-default-user.png'
      }
    },
    computed: {},
    methods: {
      ...mapActions([
        'ACTION_GET_USER_DETAIL'
      ]),
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
    created () {
    },
    mounted () {
      this.ACTION_GET_USER_DETAIL().then(item => {
        console.log(this.userDetail)
      })
    }
  }
</script>
