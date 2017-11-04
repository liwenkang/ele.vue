<!-- 这是单个商品的评价 -->
<template>
  <div class="rating-wrapper">
    <div class="rating">
      <h1 class="title">商品评价</h1>
      <div class="classify">
        <!-- 如何让这里的allCount正确显示出值, 也就是我希望只有我点击, 才会发生初始值重置 -->
        <span class="all" @click="showAll">全部<b>{{allCount}}</b></span>
        <span class="recommend" @click="showRecommend">推荐<b>{{goodCount}}</b></span>
        <span class="bad" @click="showBad">吐槽<b>{{badCount}}</b></span>
      </div>
      <div class="onlyInfo" @click="ifText">
        <i class="icon-check_circle"></i>
        <span class="ifText">只看有内容的评价</span>
      </div>
      <!--<div @click="init">计数</div>-->
    </div>
    <div class="userRating">
      <ul>
        <li v-for="(item, index) in this.food.ratings" class="userSingle clearfix">
          <div class="left">
            <div class="rateTime">{{formatTime(item.rateTime)}}</div>
            <i class="icon-thumb_up" v-show="item.rateType == 0"></i>
            <i class="icon-thumb_down" v-show="item.rateType == 1"></i>
            <span class="text">{{item.text}}</span>
          </div>
          <div class="right">
            <span class="username">{{item.username}}</span>
            <img class="avatar" :src="item.avatar">
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      food: {                  // 这是我接受到的food, 这个food应该是唯一的
        type: Object
      }
    },
    data() {
      return {
        allRatings: [],
        allCount: 0,
        goodRatings: [],
        goodCount: 0,
        badRatings: [],
        badCount: 0,
        textRatings: []
      }
    },
    beforeUpdate: function () {
//      console.log('beforeUpdate初始化数据')
      // 写一个定时器, 延时触发
      // updated的效果相同
      /* eslint-disable */
      if (this.init) {
        setTimeout(this.init, 10)
      }
      this.init = null
    },
    methods: {
      init() {
        for (let item in this.food.ratings) {
          this.allCount++
          if (this.food.ratings[item].text !== '') {
            this.textRatings.push(this.food.ratings[item])
          }
          if (this.food.ratings[item].rateType === 0) {
            // 好评, 加入 good
            this.goodRatings.push(this.food.ratings[item])
            this.goodCount++
          } else if (this.food.ratings[item].rateType === 1) {
            this.badRatings.push(this.food.ratings[item])
            this.badCount++
          }
        }
      },
      formatTime(time) {
        // 接受一个时间, 返回格式化之后的时间
        let result = new Date(time)
        result = result.toISOString().replace('T', ' ')
        // 后8位截断
        result = result.replace(/:\d\d\.000Z/, ' ')
        return result
      },
      // 这是用来改变要显示哪些内容
      showAll() {
        this.food.ratings = this.allRatings
      },
      showRecommend() {
        this.food.ratings = this.goodRatings
      },
      showBad() {
        this.food.ratings = this.badRatings
      },
      ifText() {
        this.food.ratings = this.textRatings
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/_mixins.styl"

  // 这是为了引入小图标,我咋就搞不定呢
  @font-face {
    font-family: 'sell-icon';
    src: url('../../common/fonts/sell-icon.eot?exau1o');
    src: url('../../common/fonts/sell-icon.eot?exau1o#iefix') format('embedded-opentype'),
      url('../../common/fonts/sell-icon.ttf?exau1o') format('truetype'),
      url('../../common/fonts/sell-icon.woff?exau1o') format('woff'),
      url('../../common/fonts/sell-icon.svg?exau1o#sell-icon') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  [class^="icon-"], [class*=" icon-"] {
    /* use !important to prevent issues with browser extensions that change fonts */
    font-family: 'sell-icon' !important;
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;

    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-add_circle:before {
    content: "\e900";
  }

  .icon-arrow_lift:before {
    content: "\e901";
  }

  .icon-check_circle:before {
    content: "\e902";
  }

  .icon-close:before {
    content: "\e903";
  }

  .icon-favorite:before {
    content: "\e904";
  }

  .icon-keyboard_arrow_right:before {
    content: "\e905";
  }

  .icon-remove_circle_outline:before {
    content: "\e906";
  }

  .icon-shopping_cart:before {
    content: "\e907";
  }

  .icon-thumb_down:before {
    content: "\e908";
  }

  .icon-thumb_up:before {
    content: "\e909";
  }

  .rating-wrapper
    width 100%
    background #000
    .rating
      padding 18px 18px 12px 18px
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      background #fff
      .title
        padding-bottom 6px
        line-height 14px
        font-size 14px
        font-weight 700
        color rbg(7, 17, 27)
      .classify
        padding 12px 0 18px 0
        .all, .recommend, .bad
          display inline-block
          padding 8px 12px
          line-height 16px
          font-size 12px
          text-align center
          margin-right 8px
        .all
          background rgb(0, 160, 220)
          border-radius 12px
          color #fff
        .recommend
          color rgb(77, 85, 93)
          border-radius 1px
          background rgba(0, 160, 220, 0.2)
        .bad
          color rgb(77, 85, 93)
          border-radius 1px
          background rgba(77, 85, 93, 0.2)
        border-1px(rgba(7, 17, 27, 0.1))
      .onlyInfo
        padding 12px 0
        font-size 0
        .icon-check_circle
          font-size 24px
          line-height 24px
          color rgb(147, 153, 159)
          margin-right 4px
        .ifText
          display inline-block
          margin-top -2px
          vertical-align top
          font-size 12px
          line-height 24px
          color rgb(147, 153, 159)
    .userRating
      background #fff
      padding 0 18px
      .userSingle
        display block
        padding 16px 0
        border-bottom 1px solid rgba(7, 17, 27, 0.1)
        .left
          float left
          font-size 0
          .rateTime
            padding-bottom 6px
            font-size 10px
            color rgb(147, 153, 159)
            line-height 12px
          .icon-thumb_up, .icon-thumb_down
            font-size 12px
            color rgb(0, 160, 220)
            line-height 24px
            margin-right 4px
          .icon-thumb_down
            color rgb(147, 153, 159)
          .text
            font-size 12px
            color rgb(7, 17, 27)
            line-height 16px
        .right
          float right
          font-size 0
          .username
            vertical-align top
            font-size 10px
            color rgb(147, 153, 159)
            line-height 12px
            margin-right 6px
          .avatar
            vertical-align top
            width 12px
            height 12px
</style>
