<!-- 单个食物的评价 -->
<template>
  <!-- todo 当拖动超出后, 应该加一个遮罩在后面-->
  <transition name="move">
  <div v-show="showFlag" class="food" ref="foodWrapper">
    <div>
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now"><b class="money">￥</b>{{food.price}}</span>
            <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
          </div>
          <div class="cartcontrol-wrapper">
            <cartcontrol :food="food"></cartcontrol>
          </div>
          <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
        </div>
      </div>

      <split v-show="food.info"></split>
      <!--商品信息和商品评价应该位于同一个可以滚动的空间里面 -->
      <div class="info" v-show="food.info">
        <h1 class="title">商品介绍</h1>
        <p class="text">{{food.info}}</p>
      </div>

      <split v-show="food.info"></split>

      <div class="ratings">
        <h1 class="title">商品评价</h1>
        <!-- 这是一个抽象的组件,用于用户的评价 -->
        <ratingselect @select="selectRating" @toggle="toggleContent" :selectType="selectType"
                      :onlyContent="onlyContent" :desc="desc"
                      :ratings="food.ratings"></ratingselect>

        <div class="rating-wrapper">
          <ul v-show="food.ratings && food.ratings.length">
            <li v-show="needShow(rating.rateType, rating.text)" v-for="rating in food.ratings"
                class="rating-item border-1px">
              <div class="user">
                <span class="name">{{rating.username}}</span>
                <img class="avatar" :src="rating.avatar" width="12" height="12">
              </div>
              <div class="time">{{rating.rateTime | formatDate}}</div>
              <p class="text">
                  <span
                    :class="{'icon-thumb_up':rating.rateType===0, 'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
              </p>
            </li>
          </ul>
          <div class="no-rating" v-show="!food.ratings || !food.ratings.length">
            暂无评价
          </div>
        </div>
      </div>
    </div>
  </div>
  </transition>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol'
  import Vue from 'vue'
  import split from '../split/split.vue'
  import ratingselect from '../ratingselect/ratingselect.vue'
  import {formatDate} from '../../common/js/date'
  // 不带花括号 需要export default
  // 带花括号的话是 export function

  //  const POSITIVE = 0
  //  const NEGATIVE = 1
  const ALL = 2

  export default {
    props: {
      food: { // 接收一个food
        type: Object
      }
    },
    data() {
      return {
        // 这是我要传入ratingselect的一些数据
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    methods: {
      show() {
        this.showFlag = true
        // 当传入数据后, 数据要刷新一遍才能使用
        this.selectType = ALL // 用于控制子组件中ratingselect样式的改变
        this.onlyContent = false
        // 当页面被展示 , 才加scroll
        this.$nextTick(() => {
          if (!this.scroll) { // 如果没有加滚动, 那么加上滚动, 如果已经加了, 就刷新一下
            this.scroll = new BScroll(this.$refs.foodWrapper, {
              click: true,
              probeType: 3
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide() {
        this.showFlag = false
      },
      addFirst(event) {
        // 防止PC端多次点击, 现在已经修复
//        this.$dispatch('cart.add', event.target)
        this.$emit('add', event.target)
        Vue.set(this.food, 'count', 1)
        this.food.count = 1
      },
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
      cartcontrol,
      split,
      ratingselect
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
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

  .food
    /* 它的高度应该是很长的 */
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 30
    width 100%
    background-color #ffffff
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .image-header
      position relative
      width 100%
      height 0
      padding-top 100% // 上下的 padding 和宽度(100%)一致
      img
        position absolute
        top: 0
        left 0
        width 100%
        height 100%
      .back
        position absolute
        z-index: 2
        top 10px
        left 0
        .icon-arrow_lift
          display blcok
          padding 10px
          font-size 20px
          color #fff
    .content
      position relative
      padding 18px
      background #fff
      .title
        line-height 14px
        margin-bottom 8px
        font-size 14px
        font-weight 700
        color rbg(7, 17, 27)
      .detail
        margin-bottom 18px
        line-height 10px
        height 10px
        font-size 0
        .count
          font-size 10px
          color rgb(147, 153, 159)
          margin-right 12px
        .rating
          font-size 10px
          color rgb(147, 153, 159)
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
      .cartcontrol-wrapper
        position absolute
        right 12px
        bottom 12px
      .buy
        position absolute
        right 18px
        bottom 18px
        z-index 0
        line-height 24px
        padding 0 12px
        box-sizing border-box
        font-size 10px
        border-radius 12px
        color #fff
        background: rgb(0, 160, 220)
    .info
      padding 18px
      background-color #fff
      .title
        line-height 14px
        margin-bottom 6px
        font-size 14px
        color rgb(7, 17, 27)
      .text
        line-height 24px
        padding 0 8px
        font-size 12px
        color rgb(77, 85, 93)
    .ratings
      padding-top 18px
      background-color #fff
      .title
        margin-left 18px
        line-height 14px
        font-size 14px
        color rbg(7, 17, 27)
      .rating-wrapper
        padding 0 18px
        .rating-item
          position relative
          display block
          padding 16px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .user
            position absolute
            right 0
            top 16px
            font-size 0
            line-height 12px
            .name
              display inline-block
              vertical-align top
              font-size 10px
              color rgb(147, 153, 159)
              margin-right 6px
            .avatar
              display inline-block
              vertical-align top
          .time
            margin-bottom 6px
            font-size 10px
            color rgb(147, 153, 159)
            line-height 12px
          .text
            font-size 12px
            color rgb(7, 17, 27)
            line-height 16px
            .icon-thumb_up, .icon-thumb_down
              font-size 12px
              line-height 16px
              margin-right 4px
            .icon-thumb_up
              color rgb(0, 160, 220)
            .icon-thumb_down
              color rgb(147, 153, 159)
        .no-rating
          padding 16px 0
          font-size 12px
          color rbg(147, 153, 159)
</style>
