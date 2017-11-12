<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decrease">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <!-- 点击就会导致食物数量增加, 显示在food.count里面 -->
    <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import Vue from 'vue'

  export default {
    props: {
      food: {                  // 关联food
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1) // 如果不存在这个属性, 就创建它且赋值为1
        } else {
          this.food.count++
        }
      },
      decrease() {
        if (this.food.count) {
          this.food.count--
        }
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease
      display: inline-block
      padding: 6px
      opacity: 1
      transform: translate3d(0, 0, 0) // 提前开启硬件加速
      .inner
        display: inline-block // 让它有个自适应宽高, 这样才能做动画
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
        transition: all 0.4s linear // 在哪里发生动画,在哪写这个, 数字设置线性变化
        transform: rotate(0)
      &.move-enter-active, &.move-leave-active
        transition: all 0.4s linear
      &.move-enter, &.move-leave-active
        opacity: 0 // 从实心, 到空心
        transform: translate3d(24px, 0, 0) // 进入, 离开 实现滚动的动画
        .inner
          transform: rotate(180deg)
  // 旋转180deg 和滚动同时发生
    .cart-count
      display inline-block
      width 12px
      vertical-align top
      padding-top 4px
      line-height 24px
      font-size 10px
      text-align center
      color rgb(147, 153, 159)
    .cart-add
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color rgb(0, 160, 220)
</style>
