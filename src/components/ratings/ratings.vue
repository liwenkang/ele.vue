<!-- 这是对整个店的评价 -->
<template>
  <div class="ratings" ref="ratings">
    <div class="rating-content">
      <div class="overview">

        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="scoreText">综合评分</div>
          <div class="rankRate">高于周边商家{{seller.rankRate}}%</div>
        </div>

        <div class="overview-right">

          <div class="serviceScore">
            <span class="text">服务态度</span>
            <star :size="36" :score="seller.serviceScore" class="star-wrapper">></star>
            <span class="servicescore">{{seller.serviceScore}}</span>
          </div>

          <div class="foodScore">
            <span class="text">食物评分</span>
            <star :size="36" :score="seller.foodScore" class="star-wrapper">></star>
            <span class="foodscore">{{seller.foodScore}}</span>
          </div>

          <div class="deliveryTime">
            <span class="deliverytext">送达时间</span>
            <span class="deliverytime">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType"
                    :onlyContent="onlyContent" :desc="desc"
                    :ratings="ratings"></ratingselect>
      <!-- 接下来是用户的评价 -->

      <div class="rating-wrapper">
        <ul v-show="this.ratings && this.ratings.length">
          <li v-show="needShow(item.rateType, item.text)" v-for="item in this.ratings" class="rating-item">
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
                  <div class="rateTime">{{item.rateTime | formatDate}}</div>
                </div>
              </div>
              <div class="text">{{item.text}}</div>
              <span class="rateType">
                <i :class="(item.rateType === 0)?'icon-thumb_up':'icon-thumb_down'"></i>
              </span>
              <ul class="recommend" v-show="item.recommend && item.recommend.length">
                <li v-for="Food in item.recommend" class="buyFoods">{{Food}}</li>
              </ul>
            </div>
          </li>
        </ul>
        <div class="no-rating" v-show="!this.ratings || !this.ratings.length">
          暂无评价
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import star from '../star/star.vue'
  import split from '../split/split.vue'
  import ratingselect from '../ratingselect/ratingselect.vue'
  import {formatDate} from '../../common/js/date'

  const ERR_OK = 0
  const ALL = 2

  export default {
    props: {
      seller: {
        type: Object // 接收数据
      }
    },
    data() {
      return {
        ratings: [],
        // 这是我要传入ratingselect的一些数据
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }
    },
    // 如何获取data里的数据
    created() {
      this.$http.get('/api/ratings').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.ratings = response.data
          this.$nextTick(() => {
            // 当计算和dom相关的东西, 要保证他们已经渲染了
            // 数据和dom之间的映射联系起来 实际发生变化在nextTick后
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.ratings, {
                click: true
              })
            } else {
              this.scroll.refresh()
            }
          })
        } else {
          console.log('response', response)
          console.log('response.errno', response.errno)
        }
      })
    },
    methods: {
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false // 是否要显示内容?  都不显示
        }
        if (this.selectType === ALL) {
          return true // 全显示
        } else {
          return type === this.selectType // 判断是否相等, 若相等, 则返回
        }
      },
      selectRating(type) {
        this.selectType = type
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      },
      toggleContent() {
        this.onlyContent = !this.onlyContent
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time)
        return formatDate(date, 'yyyy-MM-dd hh:mm')
      }
    },
    components: {
      star,
      split,
      ratingselect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="">
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

  .ratings
    position: absolute
    top: 174px
    // 48px
    bottom 0
    left: 0
    width: 100%
    overflow hidden // 隐藏多的部分
    .overview
      display flex
      padding 18px 0
      .overview-left
        flex 0 0 137px
        width 137px
        padding 6px 0
        border-right 1px solid #E6E7E8
        text-align center
        @media only screen and (max-width 350px)
          flex 0 0 100px
          width 100px
        .score
          margin-bottom 6px
          height 28px
          line-height 28px
          font-size 24px
          color rgb(255, 153, 0)
        .scoreText
          margin-bottom 8px
          height 12px
          line-height 12px
          font-size 12px
          color rgb(7, 17, 27)
        .rankRate
          height 10px
          line-height 10px
          font-size 10px
          color #93999F
      .overview-right
        flex 1
        padding 6px 0 6px 24px
        @media only screen and (max-width 350px)
          padding 6px 0 6px 0
        .serviceScore
          margin-bottom 8px
          font-size 0
          height 18px
          .text
            line-height 18px
            font-size 12px
            font-weight 700
            color rgb(7, 17, 27)
            vertical-align top
          .star-wrapper
            display inline-block
            margin 0 12px
            vertical-align top
          .servicescore
            display inline-block
            font-size 12px
            color rgb(255, 153, 0)
            line-height 18px
        .foodScore
          margin-bottom 8px
          font-size 0
          height 18px
          .text
            line-height 18px
            font-size 12px
            font-weight 700
            color rgb(7, 17, 27)
            vertical-align top
          .star-wrapper
            display inline-block
            margin 0 12px
            vertical-align top
          .foodscore
            display inline-block
            font-size 12px
            color rgb(255, 153, 0)
            line-height 18px
        .deliveryTime
          font-size 0
          .deliverytext
            font-size 12px
            font-weight 700
            margin-right 12px
            color rgb(7, 17, 27)
            line-height 18px
          .deliverytime
            font-size 12px
            font-weight 700
            color rgb(147, 153, 159)
            line-height 18px
    .rating-wrapper
      margin 0 18px 0 18px
      .rating-item
        margin 18px 0 18px 0
        padding-bottom 18px
        border-1px(#E6E7E8)
        display flex
        &:last-child
          margin-bottom 0
        .avatar
          margin-right 12px
          width 28px
          flex 0 1 auto
          img
            width 28px
            height 28px
            border-radius 50%
        .content
          flex 1
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
              display inline-block
              padding 0 6px
              margin-right 8px
              border 1px solid rgba(7, 17, 27, 0.1)
              border-radius 2px
              font-size 9px
              color rgb(147, 153, 159)
              line-height 16px
      .no-rating
        padding 16px 0
        font-size 12px
        color rbg(147, 153, 159)
</style>
