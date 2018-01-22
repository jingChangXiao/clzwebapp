/**
* @file 修改密码
* @author Leo
* @date 2017/12/19
*/
<template>
  <div>
    <content-title :titleData="{title: '修改密码'}"></content-title>
    <div class="mui-content div-user-center">
      <div class="mui-scroll-wrapper" style="top:45px;">
        <div class="mui-scroll">
          <div class="login-input">
            <form id='login-form' class="mui-input-group">
              <div class="mui-input-row">
                <label>原始密码:</label>
                <input type="text" class="mui-input-clear mui-input" v-model="editPassword.oldPassword" placeholder="原始密码">
              </div>
              <div class="mui-input-row">
                <label>新密码:</label>
                <input type="password" class="mui-input-clear mui-input" v-model="editPassword.newPassword" placeholder="6-20个字母与数字组合">
              </div>
              <div class="mui-input-row">
                <label>确认密码:</label>
                <input type="password" class="mui-input-clear mui-input" v-model="editPassword.suePassword" placeholder="6-20个字母与数字组合">
              </div>
            </form>
          </div>
          <div class="login-btn">
            <div class="demo-flat-button" @tap="save">提交</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .mui-input-row{
    font-size: 14px;
    .mui-input::-webkit-input-placeholder{
      font-size: 14px;
    }
  }
  .demo-flat-button {
    background-color: #007aff;
    color: #FFF;
    text-align: center;
    width: 100%;
    height: 35px;
    border-radius: 5px;
    line-height: 35px;
  }

  .login-input {
    width: 80%;
    margin: auto;
    margin-top: 30px;
  }

  .login-btn {
    width: 80%;
    margin: auto;
    margin-top: 50px;
  }

  .login-btn-post {
    width: 100%;
    background-color: #7e57c2;
    color: white;
    height: 40px;
    line-height: 40px;
    border-radius: 5px;
  }
</style>
<script>
  import {api} from '@/assets/js/api'
  import {APIS} from '@/assets/js/config'
  export default{
    data () {
      return {
        editPassword: {
          oldPassword: '',
          newPassword: '',
          suePassword: ''
        }
      }
    },
    computed: {},
    methods: {
      save () {
        if (this.editPassword.oldPassword === this.editPassword.suePassword) {
          mui.alert('新密码与确认密码不一致')
          return
        }
        let editPassword = {url: APIS.editPassword, method: 'POST', param: this.editPassword}
        api.initAjax(editPassword).then((rtData) => {
          if (rtData.status) {
            mui.alert('修改成功', () => {
              mui.back()
            })
          } else {
            mui.alert(rtData.message)
          }
        }, (rtData) => {
          mui.alert(rtData.message)
        })
      }
    }
  }
</script>
