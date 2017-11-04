<!-- 这是对整个店的评价 -->
<template>
  <div class="ratings">
    <div class="rating-index">
      <div class="left">
        <div class="score">{{seller.score}}</div>
        <div class="scoreText">综合评分</div>
        <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
      </div>
      <div class="right">
        <div class="serviceScore">
          <div class="text">服务态度</div>
          <div class="star-wrapper">
            <star :size="36" :score="seller.serviceScore"></star>
          </div>
          <div class="servicescore">{{seller.serviceScore}}</div>
        </div>
        <div class="foodScore">
          <div class="text">食物评分</div>
          <div class="star-wrapper">
            <star :size="36" :score="seller.foodScore"></star>
          </div>
          <div class="foodscore">{{seller.foodScore}}</div>
        </div>
        <div class="deliveryTime">
          <span class="deliverytext">送达时间</span>
          <span class="deliverytime">{{seller.deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
    <split></split>
    <!-- 接下来是用户的评价 -->
    <div class="storeRating">
      <ul>
        <li v-for="item in this.ratings" class="singleRating clearfix">
          <div class="avatar">
            <img :src="item.avatar">
          </div>
          <div class="content">
            <div class="info clearfix">
              <div class="left">
                <div class="username">{{item.username}}</div>
                <div class="score">
                  <star :size="24" :score="item.score"></star>
                </div>
                <div class="deliveryTime">{{item.deliveryTime}}分钟送达</div>
              </div>
              <div class="right">
                <div class="rateTime">{{formatTime(item.rateTime)}}</div>
              </div>
            </div>
            <div class="text">{{item.text}}</div>
            <span class="rateType">
              <i class="icon-thumb_up" v-show="item.rateType == 0"></i>
              <i class="icon-thumb_down" v-show="item.rateType == 1"></i>
            </span>
            <ul class="recommend">
              <li v-for="Food in item.recommend" class="buyFoods">{{Food}}</li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue'
  import split from '../split/split.vue'

  const ERR_OK = 0

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        ratings: []
      }
    },
    components: {
      star,
      split
    },
    // 如何获取data里的数据
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.ratings = response.data
        } else {
          console.log('response', response)
          console.log('response.errno', response.errno)
        }
      })
    },
    methods: {
      formatTime(time) {
        // 接受一个时间, 返回格式化之后的时间
        let result = new Date(time)
        result = result.toISOString().replace('T', ' ')
        // 后8位截断
        result = result.replace(/:\d\d\.000Z/, ' ')
        return result
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">

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

  .rating-index
    display flex
    margin 18px 24px 18px 0
    .left
      width 137px
      flex 0 1 auto
      border-right 1px solid #E6E7E8
      .score
        height 28px
        line-height 28px
        text-align center
        margin-bottom 6px
        font-size 24px
        color rgb(255, 153, 0)
      .scoreText
        height 12px
        line-height 12px
        text-align center
        margin-bottom 8px
        font-size 12px
        color rgb(7, 17, 27)
      .rankRate
        height 10px
        line-height 10px
        text-align center
        margin-bottom 6px
        font-size 10px
        color #93999F
    .right
      flex 1 1 auto
      margin-left 24px
      .serviceScore
        margin-bottom 8px
        font-size 0
        .text
          display inline-block
          font-size 12px
          font-weight 700
          color rgb(7, 17, 27)
          line-height 18px
          height 18px
        .star-wrapper
          display inline-block
          margin 0 12px 0 12px
        .servicescore
          display inline-block
          font-size 12px
          color rgb(255, 153, 0)
          line-height 18px
          height 18px
      .foodScore
        margin-bottom 8px
        font-size 0
        .text
          display inline-block
          font-size 12px
          font-weight 700
          color rgb(7, 17, 27)
          line-height 18px
          height 18px
        .star-wrapper
          display inline-block
          margin 0 12px 0 12px
        .foodscore
          display inline-block
          font-size 12px
          color rgb(255, 153, 0)
          line-height 18px
          height 18px
      .deliveryTime
        font-size 0
        .deliverytext
          font-size 12px
          font-weight 700
          margin-right 12px
          color rgb(7, 17, 27)
          line-height 18px
          height 18px
        .deliverytime
          font-size 12px
          font-weight 700
          color rgb(147, 153, 159)
          line-height 18px
          height 18px

  .storeRating
    margin 0 18px 0 18px
    .singleRating
      margin 18px 0 18px 0
      padding-bottom 18px
      border-bottom 1px solid #E6E7E8
      display flex
      .avatar
        margin-right 12px
        width 28px
        flex 0 1 auto
        img
          width 28px
          height 28px
          border-radius 50%
      .content
        flex 1 1 auto
        .info
          width 100%
          .left
            float left
            font-size 0
            .username
              font-size 10px
              color rgb(7, 17, 27)
              line-height 12px
              height 12px
              margin-bottom 4px
            .score
              display inline-block
              margin-right 6px
            .deliveryTime
              display inline-block
              font-size 10px
              font-weight 200
              color rgb(147, 153, 159)
              line-height 12px
              height 12px
          .right
            float right
            font-size 0
            .rateTime
              font-size 10px
              font-weight 200
              color rgb(147, 153, 159)
              line-height 12px
              height 12px
        .text
          line-height 18px
          font-size 12px
          color rgb(7, 17, 27)
          margin-bottom 8px
        .rateType
          display inline-block
          font-size 12px
          color rgb(0, 160, 220)
          line-height 16px
          height 16px
          margin-right 8px
        .recommend
          display inline
          .buyFoods
            display inline
            padding 0 6px
            margin-right 8px
            border 1px solid rgba(7,17,27,0.1)
            border-radius 2px
            font-size 9px
            color rgb(147,153,159)
            line-height 16px
</style>
