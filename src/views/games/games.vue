<template lang="pug">
reactive-panel
  template( v-slot:catalog)
    h3.title 游戏资料目录
    ul.games-ul
      li( v-for="(item, i) in catalogs")
        span( @click="$router.push({name: item.routeName})") {{ i+1 }}. {{ item.label }}
  template( v-slot:content)
    router-view
</template>

<script>
import ReactivePanel from "../components/reactive-panel";

export default {
  components: { ReactivePanel },
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
      ]
    };
  },
  created() {}
};
</script>

<style lang="stylus" scoped>
.reactive-panel
  .title
    font-size 16px
    padding 2px 5px
  .games-ul
    font-size 14px
    position relative
    z-index 1
    height calc(100% - 25px)
    box-sizing border-box
    overflow auto
    padding-bottom 70px
    > li
      padding 2px 5px
      margin-top 10px
      > span
        cursor pointer
        &:hover
          text-decoration underline dashed
</style>
