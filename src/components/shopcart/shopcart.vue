<template>
  <div class="shopcart">
    <div class="content">
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
      <div class="content-right">
        <div class="pay" :class="payClass">{{payDesc}}</div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
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
</style>
