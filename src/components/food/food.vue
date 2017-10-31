<template>
  <div ref="foodWrapper" class="scrollWrapper">
    <div v-show="showFlag" class="food">
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
          <!-- todo 加动画-->
          <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count === 0">加入购物车</div>
        </div>
      </div>
      <split v-show="food.info"></split>
      <!-- 商品信息和商品评价应该位于同一个可以滚动的空间里面 -->
      <div class="info" v-show="food.info">
        <h1 class="title">商品介绍</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <split v-show="food.info"></split>
      <rating :food="food"></rating>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol'
  import Vue from 'vue'
  import split from '../split/split.vue'
  import rating from '../rating/rating.vue'

  export default {
    props: {
      food: { // 接收一个food
        type: Object
      }
    },
    data() {
      return {
        showFlag: false
      }
    },
    methods: {
      show() {
        this.showFlag = true
        // 当页面被展示 , 才加scroll
        this.$nextTick(() => {
          if (!this.scroll) { // 如果没有加滚动, 那么加上滚动, 如果已经加了, 就刷新一下
            this.scroll = new BScroll(this.$refs.foodWrapper, {
              clcik: true
            })
          } else {
            this.scroll.refresh()
          }
        })
      },
      hide() {
        this.showFlag = false
      },
      addFirst() {
        // 防止PC端多次点击, 现在已经修复
        console.log('click')
//        this.$dispatch('cart.add', event.target)
        Vue.set(this.food, 'count', 1)
        this.food.count = 1
      }
    },
    components: {
      cartcontrol,
      split,
      rating
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

  .food
    /* 它的高度应该是很长的 */
    position fixed
    left 0
    top 0
    bottom 48px
    z-index 1
    width 100%
    background-color #fff
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
        .count, .rating
          font-size 10px
          color rgb(147, 153, 159)
        .count
          margin-right 12px
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
      background-color: #fff;
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
</style>
