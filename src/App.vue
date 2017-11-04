<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
    <!--<v-shopcart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"-->
                <!--:select-foods="selectFoods"></v-shopcart>-->
  </div>
</template>

<script>
  // 引用
  import header from './components/header/header.vue'
//  import shopcart from 'components/shopcart/shopcart.vue'

  const ERR_OK = 0

  export default {
    data() {
      return {
        seller: {}
      }
    },
    created() {
      this.$http.get('/api/seller').then((response) => {
        response = response.body
        if (response.errno === ERR_OK) {
          this.seller = response.data
        }
      })
    },
    components: {
      'v-header': header
//      'v-shopcart': shopcart
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/_mixins.styl"

  // 先写布局
  // 宽高,不可被继承的,触发重绘的
  // 字体颜色,可被继承的,不会触发重绘的
  .tab
    display flex
    width 100%
    height 40px
    line-height 40px
    /* 右边这条是有问题的 border-bottom 1px solid black 会导致在移动端很粗 */
    border-1px(rgba(7, 17, 27, 0.2))
    .tab-item
      flex 1
      text-align center
      & > a
        display block
        font-size 14px
        color rgb(77, 85, 93)
        &.active
          color red
</style>
