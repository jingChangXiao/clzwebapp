/**
* @file
* @author xiaojingchang
* @data 2018/2/5
*/
<template>
  <div>
    <content-title :titleData="{title: '版本日志'}"></content-title>
    <div class="mui-content">
      <div class="mui-scroll-wrapper" style="top:45px;overflow: auto;">
        <div class="mui-scroll" style="padding: 10px;">
          <div class="version-accordion" v-for="item in information" @tap="item.active = !item.active">
            <div class="version-item-title"><div>{{item.version}}</div><span class="mui-icon mui-icon-arrowright" :class="{icon_active: !item.active}"></span></div>
            <div class="version-item-body" :class="{active: item.active}" :style="{height: item.textHeight}">
              <div class="version-item-text">
                <div v-for="txt in item.text">{{txt}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        information: [
          {
            version: '更新内容 V1.20',
            active: false,
            textHeight: '',
            text: [
              '1.投屏支持播放声音，高品质声画同步会议演示效果更出色。',
              '2.优化了远程投屏的延时问题异地开会，投屏效果更顺畅。',
              '3.优化了投屏流程，输入投屏码后点击键盘上的确定按键即可直接投屏。',
              '4.人脸识别算法优化升级，打卡更加精准快捷。',
              '5.升级了人脸录入流程，录入成功率更高，帮助管理员更快启用人性化考勤。'
            ]
          },
          {
            version: '更新内容 V1.10',
            active: true,
            textHeight: '',
            text: [
              '1.投屏支持播放声音，高品质声画同步会议演示效果更出色。',
              '2.优化了远程投屏的延时问题异地开会，投屏效果更顺畅。',
              '3.优化了投屏流程，输入投屏码后点击键盘上的确定按键即可直接投屏。',
              '4.人脸识别算法优化升级，打卡更加精准快捷。',
              '5.升级了人脸录入流程，录入成功率更高，帮助管理员更快启用人性化考勤。'
            ]
          },
          {
            version: '更新内容 V1.00',
            active: true,
            textHeight: '',
            text: [
              '1.投屏支持播放声音，高品质声画同步会议演示效果更出色。',
              '2.优化了远程投屏的延时问题异地开会，投屏效果更顺畅。',
              '3.优化了投屏流程，输入投屏码后点击键盘上的确定按键即可直接投屏。',
              '4.人脸识别算法优化升级，打卡更加精准快捷。',
              '5.升级了人脸录入流程，录入成功率更高，帮助管理员更快启用人性化考勤。'
            ]
          }
        ]
      }
    },
    created () {
    },
    mounted () {
      let i = this.information.length
      while (i--) {
        this.information[i].textHeight = document.querySelectorAll('div.version-item-text')[i].offsetHeight + 16 + 'px'
      }
    },
    methods: {}
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
  .version-accordion {
    background-color: white;
    width: 100%;
    .version-item-title {
      padding: 0 20px;
      line-height: 50px;
      background: #FFFFFF;
      border-radius: 8px 8px 0 0;
      border-bottom: 1px solid #E8E8E8;
      display: flex;
      align-items: center;
      justify-content: space-between;
      > div {
        display: inline-block;
        font-size: 15px;
        color: #FF7323;
      }
      span {
        color: #FF7323;
        font-size: 18px;
      }
    }
    .version-item-body {
      height: 100%;
      line-height: 30px;
      padding: 8px 19px;
      font-size: 15px;
      color: #666666;
      overflow: hidden;
      border-bottom: 1px solid #E8E8E8;
      transition: height 0.7s ease, padding 0.7s ease;
    }
    .active {
      height: 0 !important;
      padding: 0 19px;
      border: none;
    }
  }
  .version-accordion:last-child {
    box-shadow: 0 4px 10px 0 rgba(39, 52, 56, 0.17);
    border-radius: 0 0 8px 8px;
  }
  .mui-icon-arrowright {
    -webkit-transition: transform 0.5s ease;
    -moz-transition: transform 0.5s ease;
    -ms-transition: transform 0.5s ease;
    -o-transition: transform 0.5s ease;
    transition: transform 0.5s ease;
  }
  .icon_active {
    transform: rotate(90deg);
  }
</style>
