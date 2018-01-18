/**
* @file
* @author Leo
* @date 2017/03/02
*/
<template>
  <div class="list">
    <div class="listItem"
         v-for="(item, index) in list">
      <template v-if="item.action !== null">
        <div :class="'list-item-flag-color' + item.action">
          <span class="list-item-flag iconfont icon-tick"></span>
          <div style="position: relative">
          <span class="mui-media-object mui-pull-left mui-pull-left-flag">
            <img :src="imgSrc" width="100%">
          </span>
            <div class="mui-media-body" style="padding-left: 42px;">
            <span>
              <span class="list-item-name" v-text="item.assigneeName"></span>
              <span class="list-item-action" v-text="item.action === '1' ? '同意' : '拒绝'"></span>
              <span class="list-item-time" style=""
                    v-text="formatFn(item.endTime)"></span>
            </span>
              <div class="list-item-opinion">
                <div>
                  意见：<span v-text="item.message || '暂无意见'"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-if="item.action === null">
        <div class="list-item-flag-color">
          <span class="list-item-flag iconfont icon-tick"></span>
          <div style="position: relative">
          <span class="mui-media-object mui-pull-left mui-pull-left-flag">
            <img :src="imgSrc" width="100%">
          </span>
            <div class="mui-media-body" style="padding-left: 42px;">
            <span>
              <span class="list-item-name" v-text="item.assigneeName"></span>
              <span class="list-item-action" v-text="'待审核'"></span>
            </span>
              <div class="list-item-opinion">
                <div>
                  意见：<span v-text="item.message || '暂无意见'"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">
  .list-item-name {
    color: #333;
    font-size: 16px;
  }

  .list-item-action {
    font-size: 14px;
    margin-left: 10px;
  }

  .list-item-time {
    color: #999;
    float: right;
    font-size: 12px;
    margin-right: 5px;
  }

  .list-item-opinion {
    font-size: 12px;
    margin-top: 4px;
    color: #666;
  }

  .list-item-flag-color {
    color: gray;
  }

  .list-item-flag-color0 {
    color: #41bdc7;
  }

  .list-item-flag-color1 {
    color: #ff7323;
  }

  .list-item-flag {
    position: absolute;
    top: 10px;
    left: 13px;
    display: inline-block;
    font-size: 14px;
    z-index: 1;
    opacity: 1;
  }

  .list {
    margin: 0 4px 0;
    overflow-x: hidden;
    overflow-y: auto;
  }

  .listItem {
    position: relative;
    padding: 10px 0px 10px 40px;
  }

  .listItem:before {
    content: "";
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 100%;
    border-right: 1px solid #f3f3f3;
    left: 19px;
    z-index: 1;
  }

  .mui-pull-left-flag {
    display: inline-block;
    height: 32px;
    width: 32px;
    border-radius: 50%;
  }
</style>
<script>
  export default{
    data: function () {
      return {
        imgSrc: './static/img/user_img_m.png'
      }
    },
    props: {
      list: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      formatFn (val) {
        let date = new Date(val)
        return `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)} ${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}:${('0' + date.getMilliseconds()).slice(-2)}`
      }
    }
  }
</script>
