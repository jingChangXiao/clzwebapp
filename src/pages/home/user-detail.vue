/**
* @file 个人详细信息
* @author Leo
* @date 2017/12/19
*/
<template>
  <div>
    <content-title :titleData="{title: '个人中心'}"></content-title>
    <div class="mui-content div-user-center">
      <div class="mui-scroll-wrapper" style="top:45px;">
        <div class="mui-scroll">
          <ul class="mui-table-view">
            <li class="mui-table-view-cell">
              <a id="head" class="mui-navigate-right">
                <span class="mui-icon mui-icon-image"></span>头像
                <span class="mui-pull-right head">
									<img class="head-img mui-action-preview" width="40" :src="userDetail.data.photo"/>
								</span>
              </a>
            </li>
            <li class="mui-table-view-cell">
              <a>
                <span class="mui-icon mui-icon-person"></span>
                姓名
                <span class="mui-pull-right" v-text="userDetail.data.name"></span>
              </a>
            </li>
            <li class="mui-table-view-cell">
              <a>
                <span class="mui-icon mui-icon-starhalf"></span>
                性别<span class="mui-pull-right" v-text="userDetail.data.sex"></span>
              </a>
            </li>
          </ul>
          <ul class="mui-table-view" style="margin-top: 20px;">
            <li class="mui-table-view-cell">
              <a>
                <span class="mui-icon mui-icon-more"></span>
                工号
                <span class="mui-pull-right" v-text="userDetail.data.workCard"></span>
              </a>
            </li>
            <li class="mui-table-view-cell">
              <a>
                <span class="mui-icon mui-icon-more"></span>
                公司
                <span class="mui-pull-right" v-text="userDetail.data.companyName"></span>
              </a>
            </li>
            <li class="mui-table-view-cell">
              <a>
                <span class="mui-icon mui-icon-more"></span>
                部门
                <span class="mui-pull-right" v-text="userDetail.data.deptName"></span>
              </a>
            </li>
            <li class="mui-table-view-cell">
              <a><span class="mui-icon mui-icon-more"></span>
                岗位
                <span class="mui-pull-right" v-text="userDetail.data.positionName"></span></a>
            </li>
          </ul>
          <ul class="mui-table-view" style="margin-top: 20px;">
            <li class="mui-table-view-cell">
              <a><span class="mui-icon mui-icon-more"></span>
                电话
                <span class="mui-pull-right" v-text="userDetail.data.tel"></span></a>
            </li>
            <li class="mui-table-view-cell">
              <a><span class="mui-icon mui-icon-more"></span>
                手机
                <span class="mui-pull-right" v-text="userDetail.data.mobile"></span></a>
            </li>
            <li class="mui-table-view-cell">
              <a><span class="mui-icon mui-icon-more"></span>
                邮箱
                <span class="mui-pull-right" v-text="userDetail.data.email"></span></a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .mui-table-view-cell {
    font-size: 14px;
    .mui-pull-right{
      color: #999;
      font-size: 14px;
    }
  }
  .mui-content {
    .mui-icon {
      margin-right: 10px;
      color: #666;
    }
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
      }
    }
  }
</script>
