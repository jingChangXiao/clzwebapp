/**
* @file 主页内容
* @author Leo
* @date 2017/12/19
*/
<template>
  <div>
    <content-title :titleData="{title: '工作台', left: true}"></content-title>
    <div class="mui-content">
      <div style="padding-bottom: 50px;">
        <div class="mui-slider-item" v-for="item in menuList">
          <div class="workbench-title">
            <span v-text="item.title"></span>
          </div>
          <div class="div-flex">
            <span class="flex-span" v-for="item1 in item.children" @click="goRouter(item1.route)">
              <div style="height:68px;">
                <span class="work-item-span" :style="{backgroundColor: item1.color, boxShadow: item1.boxShadow}">
                  <span class="iconfont" :class="item1.icon"
                     style="font-size: 16px;color:white;"></span>
                  </span>
              </div>
              <div class="work-item-name"><span
                v-text="item1.title"></span></div>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
  /*工作区样式*/
  .work-item-name {
    height: 30px;
    overflow: hidden;
    font-size: 12px;
    color:#4E4E4E;
  }

  .work-item-span {
    height: 43px;
    width: 43px;
    display: inline-block;
    line-height: 46px;
    border-radius: 50%;
    margin-top: 12px;
  }

  .flex-span {
    width: 25%;
    height: 100px;
    text-align: center;
    background-color: white;
    color: #9e9e9e;
  }

  .div-flex {
    -webkit-flex-wrap: wrap;
    display: -webkit-flex;
    flex-wrap: wrap;
    margin: auto;
    margin: 0px 14px;
    background-color: white;
    box-shadow: 0 8px 10px 0 rgba(0,0,0,0.05);
    border-radius: 8px;
  }

  .workbench-title {
    font-size: 13px;
    height: 40px;
    line-height: 40px;
    margin-left: 18px;
    color: #A3A3A3;
  }
</style>
<script>
  export default{
    data () {
      return {
        menuList: [
          {
            title: '营销',
            icon: '',
            children: [
              {title: '门店管理', color: '#00c582', boxShadow: '0 8px 24px 0 rgba(0,197,130,0.20)', icon: 'icon-store', route: '/storeManageList'},
              {title: '班别管理', color: '#fc8a5b', boxShadow: '0 8px 24px 0 rgba(252,138,91,0.20)', icon: 'icon-class', route: '/searchClassManageList'},
              {title: '商品管理', color: '#4ca0ff', boxShadow: '0 8px 24px 0 rgba(76,160,255,0.30)', icon: 'icon-commodity', route: '/productManageList'}
            ]
          },
          {
            title: '教务',
            icon: '',
            children: [{title: '教练管理', color: '#FAB556', boxShadow: '0 8px 24px 0 rgba(250,181,86,0.20)', icon: 'icon-coach', route: '/coachManageList'}]
          },
          {
            title: '车务',
            icon: '',
            children: [{title: '车辆查询', color: '#86CE78', boxShadow: '0 8px 24px 0 rgba(134,206,120,0.20)', icon: 'icon-car', route: '/carManageList'}]
          },
          {
            title: '牌证',
            icon: '',
            children: [{title: '学员查询', color: '#4CB1FF', boxShadow: '0 8px 24px 0 rgba(76,177,255,0.20)', icon: 'icon-students', route: '/classManageList'}]
          }
        ]
      }
    },
    computed: {},
    methods: {
      goRouter (route) {
        this.$router.push(route)
      }
    },
    created () {
    },
    mounted () {
    }
  }
</script>
