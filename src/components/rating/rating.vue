<template>
  <div class="rating-wrapper">
    <div class="rating">
      <h1 class="title">商品评价</h1>
      <div class="classify">
        <span class="all">全部<b></b></span>
        <span class="recommend">推荐<b></b></span>
        <span class="bad">吐槽<b></b></span>
      </div>
      <div class="onlyInfo">
        <i class="icon-check_circle"></i>
        <span class="ifText">只看有内容的评价</span>
      </div>
    </div>
    <div class="userRating">
      <ul>
        <li class="userSingle">
          <div class="left">
            <!--"ratings": [
            {
              "username": "3******c",
              "rateTime": 1469281964000,
              "rateType": 0,
              "text": "很喜欢的粥",
              "avatar": "http://static.galileo.xiaojukeji.com/static/tms/default_header.png"
            },-->
            <div class="rateTime">1469281964000</div>
            <span class="rateType">0</span>
            <span class="text">很喜欢的粥</span>
          </div>
          <div class="right">
            <div class="username">3******c</div>
            <img class="avatar">http://static.galileo.xiaojukeji.com/static/tms/default_header.png
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
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
    background #fff
    .rating
      padding 18px 18px 12px 18px
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
        padding 16px 0
        .left
          float left
          font-size 10px
          color rgb(147,153,159)
          line-height 12px
        .right
          float right
</style>
