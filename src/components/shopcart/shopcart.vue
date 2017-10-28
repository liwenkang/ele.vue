<template>
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'highlight': totalPrice > 0}">
              <i class="icon-shopping_cart" :class="{'highlight': totalPrice > 0}"></i>
            </div>
            <div class="num" v-show="totalCount > 0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'highlight': totalCount > 0}">{{totalPrice}}元</div>
          <div class="desc">另需配送费{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop.prevent="pay">
          <div class="pay" :class="payClass">{{payDesc}}</div>
        </div>
      </div>
      <div class="ball-container">
        <transition name="drop">
          <div v-for="ball in balls" v-show="ball.show" class="ball">
            <div class="inner"></div>
          </div>
        </transition>
      </div>
      <div class="shopcart-list" v-show="listShow">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li v-for="food in selectFoods" class="food">
              <span class="name">{{food.name}}</span>
              <div class="price">
                <span>￥{{food.price * food.count}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :food="food"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="list-mask" v-show="listShow" @click="hideList"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import cartcontrol from '../cartcontrol/cartcontrol'

  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [{
            price: 1,
            count: 30
          }]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },

    data() {
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        fold: true
      }
    },

    computed: {
      totalPrice() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice
          return `还差￥${diff}元起送`
        } else {
          return '去结算'
        }
      },
      payClass() {
        if (this.totalPrice < this.minPrice) {
          return 'not-enough'
        } else {
          return 'enough'
        }
      },
      listShow() {
        if (this.totalCount === 0) {
          this.fold = true
          return false
        }
        let show = !(this.fold) // 如果fold, 那么就不show .不过不fold, 那么就show
        if (show) {
          if (!this.scroll) {
            this.$nextTick(() => { // 数据变了,dom变化并不会立即生效
              this.scroll = new BScroll(this.$refs.listContent, {
                click: true
              })
            })
          } else {
            this.scroll.refresh()
          }
        }
        return show
      }
    },

    methods: {
      //        todo 留着写动画
//      drop(el) {
//        console.log('shopcart里的el', el)
//      }
      toggleList() {
        if (this.totalCount === 0) {
          /* eslint-disable */
          return  // 没反应
        } else {
          this.fold = !this.fold  // 如果没展开,就展开, 如果展开了,就关闭
        }
      },
      empty() {
        this.selectFoods.forEach((food) => {
          food.count = 0
        })
      },
      hideList() {
        this.fold = !this.fold
      },
      pay() {
        if(this.totalPrice > this.minPrice) {
          window.alert('你需要支付' + this.totalPrice + '元')
        }
      }
    },

    components: {
      cartcontrol
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

  .shopcart
    position fixed
    left 0
    bottom 0
    z-index: 50
    width 100%
    height 48px
    .content
      display flex
      background-color: #141d27
      color rgba(255, 255, 255, 0.4)
      font-size 0
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          box-sizing border-box
          position relative
          top -10px
          margin 0 12px
          padding 6px
          vertical-align top
          width 56px
          height 56px
          border-radius 50%
          background-color: #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            background-color: #2b343c
            text-align center
            &.highlight
              background-color: rgb(0, 160, 220)
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
              &.highlight
                color rgb(255, 255, 255)
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            border-radius 16px
            text-align center
            font-size 9px
            font-weight 700
            color #fff
            background: rgb(240, 20, 20)
            box-shadow 0 4 8 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          line-height 24px // 为了后面的线不会撑满
          margin-top 12px
          padding-right 12px
          box-sizing border-box
          border-right 1px solid rgba(255, 255, 255, 0.1)
          font-size 16px
          font-weight 700
          &.highlight
            color rgb(255, 255, 255)
        .desc
          display inline-block
          vertical-align top
          margin 12px 0 0 12px
          line-height 24px // 为了后面的线不会撑满
          font-size 12px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          &.not-enough
            background-color: #2b343c
          &.enough
            background-color: #00b43c
            color #fff
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        &.drop-transition
          transition all 0.4s
          .inner
            width 16px
            height 16px
            border-radius 50%
            background-color: rgb(0, 160, 220);
            transition all 0.4s
    .shopcart-list
      position absolute
      left 0
      top 0
      z-index -1
      width 100%
      transform translate3d(0, -100%, 0)
    .list-header
      height 40px
      line-height 40px
      padding 0 18px
      background: #f3f5f7
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      .title
        float left
        font-size 14px
        color rgb(7, 17, 27)
      .empty
        float right
        font-size 12px
        color rgb(0, 160, 220)
    .list-content
      padding 0 18px
      max-height 217px
      overflow hidden
      background #fff
      .food
        position relative
        box-sizing border-box
        padding 12px 0px
        border-1px(rgba(7, 17, 27, 0.1))
        .name
          line-height 24px
          font-size 14px
          color rgb(7, 17, 27)
        .price
          position absolute
          right 90px
          bottom 12px
          line-height 24px
          font-size 14px
          color rgb(240, 20, 20)
          font-weight 700
        .cartcontrol-wrapper
          position absolute
          right 0
          bottom 3px

  .list-mask
    position fixed
    top 0
    left 0
    z-index 0
    width 100%
    height 100%
    overflow hidden
    background rgba(7, 17, 27, 0.6)
</style>
