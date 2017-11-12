<template>
  <div class="seller" ref="sellerWrapper">
    <div>
      <div class="sellerInfo">
        <div class="top">
          <div class="left">
            <div class="name">{{seller.name}}</div>
            <star :size="36" :score="seller.score" class="star"></star>
            <span class="ratingCount">({{seller.ratingCount}})</span>
            <span class="sellCount">月售{{seller.sellCount}}单</span>
          </div>
          <div class="right" @click="toggleFavorite">
            <!--<div :class="this.collectFlag?'icon-true':'icon-false'" @click="toggleCollect">-->
            <span class="icon-favorite" :class="{'active':favorite}"></span>
            <!--</div>-->
            <span class="collect">{{favoriteText}}</span>
          </div>
        </div>
        <div class="bottom">
          <div class="item">
            <div class="title">起送价</div>
            <span class="number">{{seller.minPrice}}</span>
            <span class="txt">元</span>
          </div>
          <div class="item">
            <div class="title">商家配送费</div>
            <span class="number">{{seller.deliveryPrice}}</span>
            <span class="txt">元</span>
          </div>
          <div class="item">
            <div class="title">平均配送时间</div>
            <span class="number">{{seller.deliveryTime}}</span>
            <span class="txt">分钟</span>
          </div>
        </div>
      </div>

      <split></split>

      <div class="announcement-activity">
        <div class="announcement">
          <h1 class="title">公告与活动</h1>
          <p class="bulletin">{{seller.bulletin}}</p>
        </div>
        <ul v-if="seller.supports" class="supports">
          <li class="support-item" v-for="(item, index) in seller.supports">
            <span class="icon" :class="classMap[seller.supports[index].type]"></span>
            <span class="text">{{seller.supports[index].description}}</span>
          </li>
        </ul>
      </div>

      <split></split>

      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="img-wrapper" ref="picWrapper">
          <ul class="imgs" ref="picList">
            <li class="img-item" v-for="(img, index) in seller.pics">
              <img :src="seller.pics[index]" alt="" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>

      <split></split>

      <div class="infos">
        <h1 class="title">商家信息</h1>
        <ul v-if="seller.infos" class="infos-list">
          <li class="infos-item" v-for="(item, index) in seller.infos">
            <div class="text">{{seller.infos[index]}}</div>
          </li>
        </ul>
      </div>

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import split from '../../components/split/split.vue'
  import star from '../../components/star/star.vue'
  import {saveLocal, loadFromLocal} from '../../common/js/store'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false)
        })()
      }
    },
    computed: {
      favoriteText() {
        if (this.favorite) {
          return '已收藏'
        } else {
          return '收藏'
        }
      }
    },
    methods: {
      toggleFavorite: function () {
        this.favorite = !this.favorite
        saveLocal(this.seller.id, 'favorite', this.favorite)
      },
      _initScroll() {
        // 当计算和dom相关的东西, 要保证他们已经渲染了
        // 数据和dom之间的映射联系起来 实际发生变化在nextTick后
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.sellerWrapper, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      },
      _initPics() {
        if (this.seller.pics) {
          let picWidth = 120
          let margin = 6
          let width = (picWidth + margin) * this.seller.pics.length - margin
          this.$refs.picList.style.width = width + 'px'
          this.$nextTick(function () {
            if (!this.picScroll) {
              this.picScroll = new BScroll(this.$refs.picWrapper, {
                scrollX: true,
                eventPassthrough: 'vertical'
              })
            } else {
              this.picScroll.refresh()
            }
          })
        }
      }
    },
    watch: {
      seller: function () {
        this.$nextTick(function () {
          this._initScroll()
          this._initPics()
        })
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this._initScroll()
        this._initPics()
      })
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    },
    components: {
      split,
      star
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

  .seller
    position: absolute
    top: 174px
    // 48px
    bottom 0
    left: 0
    width: 100%
    overflow hidden
    .sellerInfo
      margin 18px
      .top
        position relative
        display block
        height 62px
        border-1px(rgba(7, 17, 27, 0.1))
        .left
          .name
            font-size 14px
            line-height 28px
            height 28px
            color rgb(7, 17, 27)
          .star
            display inline-block
            vertical-align top
          .ratingCount
            vertical-align top
            margin 0 12px 0 8px
            font-size 10px
            color rgb(77, 85, 93)
            line-height 18px
            height 18px
          .sellCount
            vertical-align top
            font-size 10px
            color rgb(77, 85, 93)
            line-height 18px
            height 18px
        .right
          position absolute
          top 0
          right 0
          width 36px
          text-align center
          .icon-favorite
            vertical-align bottom
            font-size 24px
            color rgb(77, 85, 93)
            line-height 24px
            height 24px
            margin-bottom 4px
            &.active
              color rgb(240, 20, 20)
          .collect
            font-size 10px
            color rgb(77, 85, 93)
            line-height 10px
            height 10px
      .bottom
        display flex
        .item
          flex 1
          margin-top 18px
          border-right 1px solid rgba(7, 17, 27, 0.1) // 最后一个为none
          text-align center
          &:last-child
            border-right none
          .title
            margin-bottom 4px
            font-size 10px
            color rgb(147, 153, 159)
            line-height 10px
          .number
            font-size 24px
            font-weight 700
            color rgb(7, 17, 27)
            line-height 24px
          .txt
            font-size 10px
            font-weight 700
            color rgb(7, 17, 27)
            line-height 10px
    .announcement-activity
      margin 18px
      .announcement
        .title
          font-size 14px
          line-height 28px
          height 28px
          color rgb(7, 17, 27)
        .bulletin
          margin 8px 12px 16px 12px
          font-size 12px
          line-height 24px
          font-weight 200
          color rgb(240, 20, 20)
      .supports
        margin 16px 12px
        .support-item
          border-top 1px solid rgba(7, 17, 27, 0.1)
          padding 16px 12px
          font-size 0
          &:last-child
            padding-bottom 0
          .icon
            display inline-block
            width 16px
            height 16px
            vertical-align top
            margin-right 6px
            background-size 16px 16px
            background-repeat no-repeat
            &.decrease
              bg-image('decrease_3')
            &.discount
              bg-image('discount_3')
            &.guarantee
              bg-image('guarantee_3')
            &.invoice
              bg-image('invoice_3')
            &.special
              bg-image('special_3')
          .text
            line-height 16px
            font-size 12px
    .pics
      padding 18px
      .title
        margin-bottom 12px
        font-size 14px
        line-height 14px
        height 14px
        color rgb(7, 17, 27)
      .img-wrapper
      // 动起来
        width 100%
        overflow hidden
        white-space nowrap
        .imgs
          font-size 0
          .img-item
            display inline-block
            width 120px
            height 90px
            margin-right 6px
            &:last-child
              margin-right 0
    .infos
      padding 18px
      color rgb(7, 17, 27)
      .title
        padding-bottom 12px
        font-size 14px
        line-height 14px
        height 14px
        border-1px(rgba(7, 17, 27, 0.1))
      .infos-list
        .infos-item
          display block
          border-1px(rgba(7, 17, 27, 0.1))
          padding 16px 12px
          line-height 16px
          font-size 12px
          font-weight 200
          &:last-child
            border-none()
</style>
