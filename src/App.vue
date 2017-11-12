<template>
  <div>
    <!-- 把data传给header -->
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods" ref="commodity">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!-- 把data传给中间的那段 商品, 评论, 商家 -->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
    <!-- 从商品那个里面把购买 商品价格, 名称放购物车里面 -->
    <!-- 也就是我要从子组件 goods 里面将 用户选择的食物:selectFoods="selectFoods" 数据传递给父组件, 然后从父组件再传给子组件 -->
    <!--<shopcart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" @selectFoods="getUser"></shopcart>-->
  </div>
</template>

<script>
  // 引用
  import {urlParse} from './common/js/utill'
  import header from './components/header/header.vue'

  const ERR_OK = 0

  export default {
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse()
            return queryParam.id
          })()
        } // 这是自定义的数据, 就相当于是data
      }
    },
    created() {
      this.$http.get('/api/seller?id=' + this.seller.id).then((response) => {
        console.log(this.seller.id)
        response = response.body
        if (response.errno === ERR_OK) {
          // this.seller = response.data // 获得了data里的seller了// 给对象扩展属性的方法
          this.seller = Object.assign({}, this.seller, response.data)
        }
      })
    },
    components: {
      'v-header': header
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
