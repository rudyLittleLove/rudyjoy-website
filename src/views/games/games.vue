<template lang="pug">
.games-wrap
  .games-catalog( :class="{close: closeMenu}" @click="closeMenu = !closeMenu")
    h3.title 游戏资料目录
    ul.games-ul
      li( v-for="(item, i) in catalogs")
        span( @click="$router.push({name: item.routeName})") {{ i+1 }}. {{ item.label }}
  div.content
    router-view
</template>

<script>
export default {
  data() {
    return {
      catalogs: [
        {
          label: "勇者斗恶龙11 怪物列表",
          routeName: "dragonQuestMonster"
        },
        {
          label: "勇者斗恶龙11 道具列表",
          routeName: "dragonQuestProp"
        }
      ],
      closeMenu: true
    };
  },
  created() {}
};
</script>

<style lang="stylus" scoped>
.games-wrap
  width 1200px
  max-width 95%
  margin auto
  font-size 16px
  color #eeeeee
  .games-catalog
    background-repeat no-repeat
    background-size 100% 1px, 1px 100%
    background-image linear-gradient(90deg, #ffffff, rgba(9, 16, 26, 0)), linear-gradient(0deg, rgba(9, 16, 26, 0), #ffffff)
    float left
    width 300px
    box-sizing border-box
    // border 1px solid #cccccc
    min-height 100%
    margin-right 10px
    min-height calc(100vh - 53px)
    .title
      font-size 16px
      padding 2px 5px
    .games-ul
      font-size 14px
      > li
        padding 2px 5px
        margin-top 10px
        > span
          cursor pointer
          &:hover
            text-decoration underline dashed
  div.content
    float left
    width 890px
    // border 1px solid #ccccc
    background-repeat no-repeat
    background-size 100% 1px, 1px 100%
    background-image linear-gradient(90deg, #ffffff, rgba(9, 16, 26, 0)), linear-gradient(0deg, rgba(9, 16, 26, 0), #ffffff)
    box-sizing border-box
    font-size 0
    min-height calc(100vh - 53px)
@media screen and (max-width 1270px)
  .games-wrap
    width 890px
    .games-catalog
      position absolute
      top 50px
      left 0
      background-image linear-gradient(90deg, rgba(9, 16, 26, 0), #ffffff), linear-gradient(0deg, rgba(9, 16, 26, 0), #ffffff)
      background-color rgba(9, 16, 26, .9)
      background-position right top
      height calc(100vh - 53px)
      width 250px
      transition margin-left .2s
      z-index 5
      &.close
        margin-left -250px
        &::before
          transform rotate(0deg)
          right -20px
          // text-indent -17px
      &::before
        overflow hidden
        // ◀
        content '▶'
        line-height 31px
        width 20px
        height 30px
        background rgba(255, 255, 255, .5)
        position absolute
        right 0
        top calc(50% - 15px)
        // border-radius 0 5px 5px 0
        border-radius 2px
        transform rotate(180deg)
        // word-spacing 1px
        white-space nowrap
        text-indent 2px
        transition text-indent .2s
      &:not(.close)
        &::after
          content ''
          position absolute
          top -50px
          bottom 0
          width 10000px
          background-image linear-gradient(90deg, transparent 250px, rgba(255, 255, 255, .2) 250px), linear-gradient(180deg, rgba(255, 255, 255, .2) 50px, transparent 50px)
          background-size 100% 100%, 250px 50px
          background-repeat no-repeat
      .games-ul
        position relative
        z-index 1
        height calc(100% - 25px)
        box-sizing border-box
        overflow auto
        padding-bottom 70px
    div.content
      background-image none
      max-width 100%
</style>
