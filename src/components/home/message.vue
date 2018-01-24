/**
* @file 主页内容
* @author Leo
* @date 2017/12/19
*/
<template>
  <div>
    <content-title :titleData="{title: '消息中心', left: true}"></content-title>
    <div class="mui-content">
      <div class="mui-row">
        <div class="mui-col-sm-6 mui-col-xs-6 label-div" :class="showFlag === 0 ? 'active' : ''"
             style="text-align: center" @tap="changeFlag(0)">
          <span class="label-div-item">聊天消息</span>

        </div>
        <div class="mui-col-sm-6 mui-col-xs-6 label-div" :class="showFlag === 1 ? 'active' : ''"
             style="text-align: center" @tap="changeFlag(1)">
          <span class="label-div-item">通知消息</span>

        </div>
      </div>
      <div>
        <div class="base-top-user" style="position: relative">
                <span class="mui-media-object mui-pull-left mui-pull-left-flag">
                  <img :src="imgSrc" width="100%">
                </span>
          <div class="mui-media-body" style="padding-left: 60px;">
                <span style="display: flex;">
                  <span style="color:#3A444A;font-size:16px;" v-text="'车厘子-张鹏'"></span>
                </span>
            <div class='mui-ellipsis' style="font-size: 12px;margin-top: 8px;color: #7F7F7F;">
              <div>
                <span v-text="'听说明天要加班?'"></span>
              </div>
            </div>
          </div>
        </div>
        <div class="base-top-user1" style="position: relative">
                <span class="mui-media-object mui-pull-left mui-pull-left-flag">
                  <img :src="imgSrc" width="100%">
                </span>
          <div class="mui-media-body" style="padding-left: 60px;">
                <span style="display: flex;">
                  <span style="color:#3A444A;font-size:16px;" v-text="'车厘子-蒋主任'"></span>
                </span>
            <div class='mui-ellipsis' style="font-size: 12px;margin-top: 8px;color: #7F7F7F;">
              <div>
                <span v-text="'一周上30天没压力好吧。'"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  .base-top-user1 {
    padding: 10px;
    border-bottom: 1px dashed #ddd;
    background-color: #ffe0b2;
  }

  .base-top-user {
    padding: 10px;
    border-bottom: 1px dashed #ddd;
    background-color: #F7F8FA;
  }

  .content-list-item {
    margin-top: 12px;
    box-shadow: 0 4px 12px 0 rgba(39, 52, 56, 0.08);
    border-radius: 9.02px;
    padding: 15px 20px 15px 18px;
    background-color: white;
  }

  .mui-pull-left-flag {
    display: inline-block;
    height: 40px;
    width: 40px;
    border-radius: 50%;
  }

  .item-teachingTypeName {
    background-image: linear-gradient(-450deg, #FFAB68 0%, #FF7626 100%);
    box-shadow: 0 4px 8px 0 rgba(255, 118, 38, 0.08);
    font-size: 12px;
    color: white;
    padding: 0px 5px;
    border-radius: 5px;
    margin-left: 15px;
  }

  .item-teachingCarName {
    background-image: linear-gradient(-450deg, #A3A3A3 0%, #515151 100%);
    box-shadow: 0 5px 10px 0 rgba(255, 118, 38, 0.08);
    border-radius: 5px;
    font-size: 12px;
    margin-left: 10px;
    padding: 0px 5px;
    color: white;
  }
</style>
<script>
  export default{
    data () {
      return {
        showFlag: 0,
        imgSrc: './static/img/user_img_m.png'
      }
    },
    computed: {},
    methods: {
      changeFlag (flag) {
        this.showFlag = flag
      }
    },
    created () {
    },
    mounted () {
    }
  }
</script>
