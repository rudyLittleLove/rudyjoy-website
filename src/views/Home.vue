<template lang="pug">
  .home
    div.button-group
      el-button( @click="loginHandle" type="primary" size="mini") 登录
      el-button( @click="transitionHandle" type="primary" size="mini") 动画
      el-button( @click="dragonQuestHandle" type="primary" size="mini") 勇者斗恶龙11 怪兽大全
      el-button( @click="dragonQuestPropHandle" type="primary" size="mini") 勇者斗恶龙11 道具大全
    transition( name="fade")
      .wrap( v-show="isShow")
</template>

<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      isShow: true
    };
  },
  methods: {
    loginHandle() {
      this.$router.push("/login");
    },
    dragonQuestHandle() {
      this.$router.push("/dragonQuest");
    },
    dragonQuestPropHandle() {
      this.$router.push("/dragonQuestProp");
    },
    transitionHandle() {
      this.isShow = !this.isShow;
    }
  }
};
</script>
<style lang="stylus" scoped>
.button-group
  padding-top 30px
  padding-bottom 30px
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
  background-image linear-gradient(90deg, #000000 0%, #000000 100%)
  background-repeat no-repeat
  background-size 100px 1px
  background-position 0 0
  animation moveLine 12s infinite linear
  .wrap
    width 200px
    height 100px
    background-color #acd3f0
@keyframes moveLine
  from
    background-position -100px 0
  to
    background-position calc(100% + 100px) 0
</style>
