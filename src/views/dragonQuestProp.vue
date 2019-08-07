<template lang="pug">
  .prop-wrap
    el-tabs( v-model="type")
      el-tab-pane( v-for="(item, i) in data" :label="item.titles[1]" :name="'index' + i")
        template( v-if="type === 'index'+ i")
          table( cellspacing="0" cellpadding="0" border="0")
            thead
              tr
                th( v-for="item2 in item.titles") {{item2.trim() ? item2 : '序号'}}
            tbody
              tr( v-for="item2 in item.data")
                td( v-for="item3 in item2") {{item3}}
</template>

<script>
import propData from "../../static/propData";
export default {
  name: "dragonQuestProp",
  data() {
    return {
      data: propData,
      type: "index0"
    };
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="stylus" scoped>
.prop-wrap
  width 1200px
  height 100%
  margin auto
  font-size 16px
  table
    width 100%
    table-layout fixed
  th
    text-align left
    &:nth-child(1)
      width 35px
  td
    padding 2px 4px
    border-bottom 1px solid #EBEEF5
  tr:nth-child(2n)
    td
      background-color #f5f7fa
@media (max-width 1200px)
  .prop-wrap
    min-width 360px
    width 100%
</style>
