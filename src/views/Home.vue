<template lang="pug">
  .home
    div.button-group
      el-button( v-for="item in routerLinks" @click="toRouterHandle(item.path)" type="primary" size="mini") {{item.label}}
      el-button( @click="transitionHandle" type="success" size="mini") 动画
    transition( name="fade")
      .wrap( v-show="isShow")
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      isShow: true,
      routerLinks: [
        {
          label: '登录',
          path: '/login'
        },
        {
          label: '勇者斗恶龙11 怪兽大全',
          path: '/dragonQuestMonster'
        },
        {
          label: '勇者斗恶龙11 道具大全',
          path: '/dragonQuestProp'
        },
        {
          label: 'git 常用命令',
          path: '/gitCommands'
        },
        {
          label: '方格动画',
          path: '/rectRandom'
        }
      ]
    }
  },
  methods: {
    toRouterHandle(path) {
      this.$router.push(path)
    },
    transitionHandle() {
      this.isShow = !this.isShow
    }
  }
}
</script>
<style lang="stylus" scoped>
.button-group
  padding-top 30px
  padding-bottom 30px
  .el-button
    margin-right 10px
    margin-top 10px
    &+.el-button
      margin-left 0
.fade-enter-active
.fade-leave-active
  transition opacity 2s
.fade-enter
  transform translateX(100px)
.fade-enter-to
  transform translateX(100px)
  opacity 0
  animation move 1s
.fade-leave-to
  transform translateX(0px)
  opacity 0
  animation move 1s
@keyframes move
  0%
    transform translateX(0px)
  10%
    transform translateX(-10px)
  100%
    transform translateX(100px)
@keyframes moveEnter
  0%
    transform translateX(100px)
  90%
    transform translateX(-10px)
  100%
    transform translateX(0px)
.home
  width 700px
  margin auto
  height 100%
  .wrap
    width 200px
    height 100px
    background-color #acd3f0
@media (max-width: 600px)
  .home
    width 100%
</style>
