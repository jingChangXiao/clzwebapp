/**
* @file
* @author Leo
* @date 2017/12/25
*/
<template>
  <div>
    <header id="header" class="mui-bar mui-bar-nav">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title" v-text="'筛选'"></h1>
      <a class="mui-btn mui-btn-link mui-pull-right" @tap="confirm()">确定</a>
    </header>
    <div class="mui-content">
      <div class="mui-scroll-wrapper" :style="liCss">
        <div class="mui-scroll">
          <div class="edit_page">
            <ul>
              <li>
                <a @tap="selectArea()" class="mui-navigate-right">
                  <label>所属片区:</label>
                  <div>{{list.searchObject.areaIdName}}</div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <footer @tap="restFn()" class="rest_bn"><span class="mui-icon crm-loading"></span>重置条件</footer>
    </div>
  </div>
</template>
<style lang='less' rel='stylesheet.less' scoped>
  .edit_page > ul {
    background: #ffffff;
    border-top: 1px solid #dbdbdb;
    border-bottom: 1px solid #dbdbdb;
    margin: 8px 0 0 0;
    padding: 0;
  }

  .edit_page > ul:nth-child(1) {
    margin: 0;
  }

  .edit_page > ul > li {
    overflow: hidden;
    margin-left: 16px;
    border-bottom: 1px solid #e8e8e8;
    position: relative;
    border-top: 0;
    display: block;
  }

  .edit_page > ul > li:last-child {
    border-bottom: 0;
  }

  .edit_page > ul > li > a {
    display: block;
    padding: 14px 4px 14px 0;
    margin-right: 10px;
    position: relative;
  }

  .edit_page > ul > li > a > em {
    position: absolute;
    font-size: 10px;
    color: #ccc;
    width: 20px;
    right: -5px;
    line-height: 44px;
    top: 50%;
    margin-top: -22px;
    text-align: center;
  }

  .edit_page > ul > li > a> span.arrows {
    position: absolute;
    top: 50%;
    margin-top: -14px;
    right: 0;
  }

  .edit_page > ul > li > a> span.arrows:after {
    content: '\A126';
    color: #A7A7A7;
    font-size: 14px;
  }

  .edit_page > ul > li > a > label {
    color: #333;
    font-size: 14px;
    float: left;
    line-height: 16px;
    font-weight: normal;
    -webkit-font-smoothing: antialiased;
  }

  .edit_page > ul > li > a > label > span {
    color: #d61518;
  }

  .edit_page > ul > li > a > div {
    word-break: break-all;
    padding-left: 100px;
    padding-right: 30px;
    font-size: 14px;
    line-height: 16px;
    text-align: right;
    min-height: 16px;
    color: #999;
  }

  .edit_page > ul > li > a > div.act {
    padding-right: 16px;
  }

  .edit_page > ul > li > a > div > input {
    width: 100%;
    font-size: 14px;
    border: 0;
    text-align: right;
    color: #999;
    padding: 0;
    margin: 0;
    height: 16px;
    line-height: 16px;
  }

  .edit_page > ul > li > a > div > input::-webkit-input-placeholder {
    direction: rtl;
  }

  .edit_page > ul > li > a > div.right > input {
    text-align: right;
  }

  .edit_page > ul > li > a > div > textarea {
    width: 100%;
    font-size: 13px;
    border: 0;
    text-align: right;
    color: #666;
  }

  .edit_page > ul > li > a > div > textarea::-webkit-input-placeholder {
    direction: rtl;
  }

  .edit_page > ul > li.switch > a {
    padding: 10px 4px 10px 0;
  }

  .edit_page > ul > li.switch > a > label {
    line-height: 30px;
  }

  .edit_page > ul > li.switch > a > div {
    min-height: 30px;
  }

  .edit_page > ul > li.switch > a > div > div {
    float: right;
  }

  .edit_page > ul > li.datetime {
    padding: 5px 0;
  }

  .edit_page > ul > li.datetime > p {
    margin: 0;
    line-height: 32px;
  }

  .edit_page > ul > li.datetime > p > a {
    font-size: 13px;
    min-width: 120px;
    color: #999;
    display: inline-block;
  }

  .edit_page > ul > li.datetime > p > a > span {
    font-size: 12px;
    color: #777;
  }

  .edit_page > ul > li.datetime > p.ti > span {
    display: inline-block;
    width: 125px;
    color: #333;
  }

  .edit_page > ul > li.datetime > p.ti > span.end {
    margin-left: 48px;
  }

  .edit_page > ul > li.datetime > p > span:before {
    font-size: 15px;
    padding: 0 15px;
  }

  .rest_bn {
    position: fixed;
    width: 100%;
    height: 44px;
    line-height: 44px;
    text-align: center;
    left: 0px;
    bottom: 0px;
    overflow: hidden;
    background-color: #fff;
    color: #d61518;
    font-size: 15px;
    z-index: 10;
    border-top: 1px solid #cbcbcb;
    opacity: 0.92;
  }

  .rest_bn > span.mui-icon {
    font-size: 18px;
    padding-right: 8px;
  }
</style>
<script>
//  import {api} from '@/assets/js/api'
//  import refreshScroll from '@/assets/js/refresh-scroll'
  export default {
    data () {
      return {
        list: this.$store.state.workList.carInfoList,
        base: this.$store.state.base,
        userInfo: this.$store.state.userInfo.userInfo,
        liCss: {
          top: '44px',
          bottom: '0'
        }
      }
    },
    methods: {
      selectArea () {
        let self = this
        let data = []
        if (this.base.loadOrgCache.data.areaList && this.userInfo.data.org_id) {
          this.base.loadOrgCache.data.areaList.forEach((item) => {
            data.push({value: item.areaId, text: item.areaName})
          })
        }
        var userPicker = new mui.PopPicker()
        userPicker.setData(data)
        userPicker.show(items => {
          self.list.searchObject.areaIdName = items[0].text
          self.list.searchObject.areaId = items[0].value
        })
      },
      restFn: function () {
        this.list.searchObject.areaIdName = ''
        this.list.searchObject.areaId = ''
      },
      confirm: function () {
//        refreshScroll.listReq(this.list)
        mui.back()
      }
    },
    created () {
    },
    mounted () {
    }
  }
</script>
