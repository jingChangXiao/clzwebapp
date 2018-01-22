/**
* @file 个人详细信息
* @author Leo
* @date 2017/12/19
*/
<template>
  <div>
    <content-title :titleData="{title: '版本记录'}"></content-title>
    <div class="mui-content div-user-center">
      <div class="mui-scroll-wrapper" style="top:45px;">
        <div class="mui-scroll" id="versionLog">
          <div class='version_div'>
            <h1>V1.0.0 - 2018.02.05</h1><br>
            "XX正式发布，主要功能清单如下:
            <h3>1.	消息中心;</h3>
            <h3>2.	工作中心;</h3>
            <h3>3.	流程中心;</h3>
            <h3>4.	个人中心;</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  /* list css */
  #versionLog li div {
    font-size: 15px;
    color: #4d4d4d;
  }
  #versionLog div.value {
    color: #00b4ff;
  }
  #versionLog li:last-child {
    background-image: none;
  }
  #versionLog .version_div {
    padding: 10px 20px;
    background-color: white;
    color: #888;
  }
  #versionLog .version_div h1 {
    color: #000000;
    font-weight: 800;
    font-size: 20px;
  }
  #versionLog .version_div h2 {
    font-size: 16px;
    padding-left: 10px;
  }
  #versionLog .version_div h3 {
    font-size: 14px;
    padding-left: 20px;
    line-height: 1.4em;
  }
</style>
<script>
  export default{
    data () {
      return {
      }
    },
    computed: {},
    methods: {}
  }
</script>
