<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5
  const clsOn = 'on'
  const clsHalf = 'half'
  const clsOff = 'off'

  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType() {
        return 'star-' + this.size
      },
      itemClasses() {
        let result = []
        let score = Math.floor(this.score * 2) / 2  // 向下取0.5
        let hasDecimal = (score % 1 !== 0) // 有半个星
        let integer = Math.floor(score) // 有几个全星
        for (let i = 0; i < integer; i++) {
          result.push(clsOn)
        }
        if (hasDecimal) {
          result.push(clsHalf)
        }
        while (result.length < LENGTH) {
          result.push(clsOff)
        }
        return result
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/_mixins.styl"

  .star
    font-size 0
    .star-item
      display inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size: 20px 20px
        &:last-child
          margin-right 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size: 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size: 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')
</style>
