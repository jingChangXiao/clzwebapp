/**
* @file 主页底部布局
* @author Leo
* @date 2017/12/19
*/
<template>
  <div class="app-page-root">
    <div class="div-login-position">
      <div class="login-logo-top">
        <img width="100" height="100" style="vertical-align: middle;" :src="loginLogo">
      </div>
      <div>
        <div class="form-input-div">
          <input class="form-input" placeholder="请输入手机号码" type="text" v-model="loginParam.username"/>
        </div>
        <div class="form-input-div" style="margin-top: 40px">
          <input class="form-input" placeholder="请输入密码" type="password" v-model="loginParam.password"/>
        </div>
      </div>
      <div style="margin-top: 25px;">
        <div style="display: inline-block;width:100%;height: 28px;font-size:12px;color:#4e4e4e;line-height:28px;">
          <span style="float:left;">记住密码
            <span class="mui-icon"
                  :class="checkFlag ? 'mui-icon-checkmarkempty' : 'mui-icon-uncheck'"
                  style="border-radius: 8px;cursor: pointer;float:left;margin-right: 10px;"
                  @tap="changeCheckFlag"
            ></span>
          </span>
          <span style="float:right;color: #ff9249;">忘记密码</span>
        </div>
      </div>
      <div class="login-btn">
        <div class="demo-flat-button toRight" @tap="login">登录</div>
        <!--<mu-flat-button label="登录" class="demo-flat-button" color="#FFF" @click="login"/>-->
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .demo-flat-button {
    height: 45px;
    line-height:45px;
    color:white;
    font-size: 16px;
    margin-top: 30px;
    border-radius: 22px;
    text-align: center;
    box-shadow: 0 17px 62px 0 rgba(255,142,42,0.20);
  }
  .div-login-position {
    margin: auto;
    margin: 0px 50px;
  }

  .login-logo-top {
    height: 250px;
    line-height: 250px;
    text-align: center;
  }

  .form-input {
    height: 35px;
    width: 100%;
    border: none;
    border-bottom: 1px solid #dbdbdb;
    background-color: #F7F8FA;
    font-size: 14px;
  }

  .mui-icon-uncheck{
    display: inline-block;
    width: 28px;
    height: 28px;
    border: 2px solid #cacaca;
  }
  .mui-icon-checkmarkempty{
    border-color:#ff9249;
    border: 2px solid #ff9249;
    color: #ff9249;
  }
  .toRight {
    background-image: -webkit-linear-gradient(to right, #ff7626, #ffab68);
    background-image: linear-gradient(to right,#ff7626,#ffab68);
  }
</style>
<script>
  import {mapActions} from 'vuex'
  import * as types from '@/store/mutation-types'
  export default{
    data () {
      return {
        checkFlag: true,
        loginLogo: './static/img/logo.png',
        loginParam: {
          username: '13600407213',
          password: '123456'
        }
      }
    },
    computed: {},
    methods: {
      ...mapActions([
        'ACTION_LOGIN',
        'ACTION_GET_LOAD_DICT_CACHE',
        'ACTION_GET_LOAD_ORG_CACHE'
      ]),
      changeCheckFlag () {
        this.checkFlag = !this.checkFlag
      },
      login () {
        this.$store.commit(types.SET_LOADING_FLAG, true)
        this.ACTION_LOGIN(this.loginParam).then((data) => {
          if (data && data.access_token) {
            window.localStorage.setItem('__ACCESS_TOKEN', data.access_token)
            Promise.all([this.ACTION_GET_LOAD_DICT_CACHE(), this.ACTION_GET_LOAD_ORG_CACHE()]).then((a, b, c) => {
              this.$router.push('/home/message')
              this.$store.commit(types.SET_LOADING_FLAG, false)
            })
          } else {
            this.$store.commit(types.SET_LOADING_FLAG, false)
          }
        })
      },
      pop () {
      }
    },
    mounted: function () {
    }
  }
</script>
