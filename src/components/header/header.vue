<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{ seller.name }}</span>
        </div>
        <div class="description">
          {{ seller.description }} / {{ seller.deliveryTime }}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <div class="icon" :class="classMap[seller.supports[0].type]"></div>
          <div class="text">{{seller.supports[0].description}}</div>
        </div>
      </div>
      <div v-if="seller.supports" class="support-count" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%" height="100%">
    </div>
    <div v-show="detailShow" class="detail" transition="change">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item, index) in seller.supports">
              <span class="icon" :class="classMap[seller.supports[index].type]"></span>
              <span class="text">{{seller.supports[index].description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="hideDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star.vue'

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data() {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true
      },
      hideDetail() {
        this.detailShow = false
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    },
    components: {
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

  .header
    position relative
    overflow hidden
    background-color rgba(7, 17, 27, 0.5)
    color #fff
    .content-wrapper
      position relative
      padding 24px 12px 18px 24px
      /* 去掉中间缝隙 */
      font-size 0
      .avatar
        display inline-block
        vertical-align top
        img
          border-radius 2px
      .content
        display inline-block
        margin-left 16px
        .title
          margin 2px 0 8px 0
          .brand
            display inline-block
            vertical-align top
            width 30px
            height 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left 6px
            font-size 16px
            line-height 18px
            font-weight bold
        .description
          margin-bottom 10px
          line-height 12px
          font-size 12px
        .support
          .icon
            display inline-block
            vertical-align top
            width 12px
            height 12px
            margin-right 4px
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image('decrease_1')
            &.discount
              bg-image('discount_1')
            &.guarantee
              bg-image('guarantee_1')
            &.invoice
              bg-image('invoice_1')
            &.special
              bg-image('special_1')
          .text
            display inline-block
            vertical-align top
            line-height 12px
            font-size 10px
      .support-count
        position absolute
        right 12px
        bottom 18px
        padding 0 8px
        height 24px
        line-height 24px
        border-radius 14px
        background-color: rgba(0, 0, 0, 0.2)
        text-align center
        .count
          vertical-align top
          font-size 10px
        .icon-keyboard_arrow_right
          margin-left 2px
          line-height 24px
          font-size 10px
    .bulletin-wrapper
      position relative
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background-color: rgba(7, 17, 27, 0.2)
      .bulletin-title
        display inline-block
        vertical-align top
        margin-top 7px
        width 22px
        height 12px
        bg-image('bulletin')
        background-size: 22px 12px
        background-repeat: no-repeat
      .bulletin-text
        vertical-align top
        margin 0 4px
        font-size 10px
      .icon-keyboard_arrow_right
        position absolute
        right 12px
        top 9px
        font-size 10px
    .background
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
    .detail
      transition all 10s
      background: rgba(7,17,27,0.8)
      position fixed
      top 0
      left 0
      z-index 100
      width 100%
      height 100%
      overflow auto
      .detail-wrapper
        width 100%
        min-height 100% //最小高度,撑满屏幕,否则当内容很少时,关闭按钮无法定到下面的位置
        .detail-main
          margin-top 64px
          padding-bottom 64px //这个一定要padding-bottom,要在这里放关闭按钮
          .name
            line-height 16px
            text-align center
            font-weight 700
            font-size 16px
          .star-wrapper
            margin-top 18px
            padding 2px 0px
            text-align center
          .title
            display flex
            width 80%
            margin 28px auto 24px
            .line
              flex 1
              position relative
              top -6px
              border-bottom 1px solid rgba(255, 255, 255, 0.2)
            .text
              padding 0 12px
              font-weight 700
              font-size 14px
          .supports
            width 80%
            margin 0 auto
            .support-item
              padding 0 12px
              margin-bottom 12px
              font-size 0
              &:last-child
                margin-bottom 0
              .icon
                display inline-block
                width 16px
                height 16px
                vertical-align top
                margin-right 6px
                background-size 16px 16px
                background-repeat no-repeat
                &.decrease
                  bg-image('decrease_2')
                &.discount
                  bg-image('discount_2')
                &.guarantee
                  bg-image('guarantee_2')
                &.invoice
                  bg-image('invoice_2')
                &.special
                  bg-image('special_2')
              .text
                line-height 14px
                font-size 12px
          .bulletin
            width 80%
            margin 0 auto
            .content
              padding 0 12px
              line-height 24px
              font-size 12px

      .detail-close
        position relative
        width 32px
        height 32px
        margin -64px auto 0 auto
        clear both
        font-size 32px
</style>
