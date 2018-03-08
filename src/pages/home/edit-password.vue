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
            <form id='login-form'>
              <div class="form-input-row">
                <div>原密码</div>
                <input type="password" v-model="editPassword.oldPassword" placeholder="请输入原始密码">
              </div>
              <div class="form-input-row">
                <input type="password" class="new-password" v-model="editPassword.newPassword" placeholder="请输入新密码">
              </div>
              <div class="form-input-row">
                <input type="password" class="new-password" v-model="editPassword.suePassword" placeholder="再次输入新密码">
              </div>
            </form>
            <div class="tip-information">密码必须由至少6个字符组成</div>
          </div>
          <div class="login-btn">
            <div class="demo-flat-button" @tap="save">确定</div>
            <div class="demo-flat-button" @tap="$router.push('/nativeTest')" style="margin-top: 20px;">原生功能测试</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .mui-scroll {
    padding: 10px;
    .login-input {
      width: 100%;
      background: #FFFFFF;
      box-shadow: 0 4px 10px 0 rgba(39,52,56,0.17);
      border-radius: 8px;
      padding: 25px 35px 25px 35px;
      .form-input-row{
        margin: 0;
        padding: 0;
        height: 55px;
        font-size: 14px;
        border-bottom: 1px solid #d8d8d8;
        div {
          font-size: 13px;
          color: #999999;
          line-height: 20px;
        }
        input {
          margin: 0;
          padding: 0;
          border: none;
          font-size: 14px;
          height: 30px;
          line-height: 30px;
          width: 100%;
        }
        input.new-password {
          margin-top: 20px;
        }
        input::-webkit-input-placeholder {
          color: #999999;
          font-size: 12px;
        }
        input::-moz-placeholder {
          color: #999999;
          font-size: 12px;
        }
        input:-ms-input-placeholder {
          color: #999999;
          font-size: 12px;
        }
        input:-moz-placeholder {
          color: #999999;
          font-size: 12px;
        }
      }
      .tip-information {
        font-size: 12px;
        color: #FF7323;
        line-height: 20px;
        margin-top: 5px;
      }
    }
  }

  .login-btn {
    width: 80%;
    margin: auto;
    margin-top: 38px;
    .demo-flat-button {
      color: white;
      height: 45px;
      font-size: 15px;
      letter-spacing: 3px;
      justify-content: center;
      -webkit-justify-content: center;
      display: flex;
      align-items: center;
      -webkit-align-items: center;
      background-image: linear-gradient(to right, #ff7626, #ffab68);
      -webkit-box-shadow: 0 17px 62px 0 rgba(255, 142, 42, 0.2);
      box-shadow: 0 17px 62px 0 rgba(255, 142, 42, 0.2);
      border-radius: 23px;
    }
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
    mounted () {},
    methods: {
      save () {
        let check = this.checkPassword()
        if (check) return mui.alert(check)
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
      },
      checkPassword () {
        let oldPassword = this.editPassword.oldPassword
        let newPassword = this.editPassword.newPassword
        let suePassword = this.editPassword.suePassword
        if (!oldPassword || !newPassword || !suePassword) {
          return '请完善密码'
        }
        if (newPassword.length < 6 || suePassword.length < 6) {
          return '密码必须由至少6个字符组成'
        }
        if (this.editPassword.newPassword !== this.editPassword.suePassword) {
          return '新密码与确认密码不一致'
        }
        if (this.editPassword.oldPassword === this.editPassword.newPassword) {
          return '新密码与旧密码不能相同'
        }
        return ''
      }
    }
  }
</script>
