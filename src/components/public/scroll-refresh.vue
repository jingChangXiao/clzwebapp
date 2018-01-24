/**
* @file
* @author Leo
* @date 2017/03/02
*/
<template>
  <div class="mui-scroll-wrapper chance-list-wrapper"
       :style="{top: top,bottom: bottom}">
    <div class="mui-scroll">
      <slot></slot>
      <!--<div v-show="nodata">-->
      <!--没有数据-->
      <!--</div>-->
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script>
  export default{
    data: function () {
      return {
        scroll: {},
        nodata: false
      }
    },
    props: {
      top: {
        type: String,
        default: '0px'
      },
      bottom: {
        type: String,
        default: '0px'
      },
      downContent: String,
      ownOverContent: String,
      downRefreshContent: String,
      upRefreshContent: String,
      nomoreContent: String,
      isDisablePulluptoRefresh: {
        type: Boolean,
        default: false
      }
    },
    events: {
      'refresh': function (item) {
        mui(this.$el).pullRefresh()
      }
    },
    methods: {
      pulldownRefresh: function () {
        window.scroll.pullDirection = 'down'
        this.$emit('pulldown', this.scroll)
      },
      pullupRefresh: function () {
        window.scroll.pullDirection = 'up'
        this.$emit('pullup', this.scroll)
      },
      disablePullupToRefresh: function () {
        mui(this.$el).pullRefresh().disablePullupToRefresh()
      },
      enablePullupToRefresh: function () {
        mui(this.$el).pullRefresh().enablePullupToRefresh()
      }
    },
    mounted () {
      this.scroll = mui(this.$el).pullRefresh({
        container: this.$el,
        down: {
          contentdown: this.downContent,
          contentover: this.ownOverContent,
          contentrefresh: this.downRefreshContent,
          callback: this.pulldownRefresh
        },
        up: {
          contentrefresh: this.upRefreshContent,
          contentnomore: this.nomoreContent,
          callback: this.pullupRefresh
        }
      })
      this.$emit('pullRefreshReady', this.scroll)
      if (this.isdisablePullupToRefresh) {
        this.disablePullupToRefresh()
      }
      this.$watch('isDisablePulluptoRefresh', function (newVal) {
        if (newVal) {
          this.enablePullupToRefresh()
        } else {
          this.disablePullupToRefresh()
        }
      })
    }
  }
</script>
